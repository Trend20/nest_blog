import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../common/database/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  //   create user
  public async createUser(
    createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    // Check if email or username already exists
    const [emailExists, usernameExists] = await Promise.all([
      this.userRepository.emailExists(createUserDto.email),
      this.userRepository.usernameExists(createUserDto.username),
    ]);

    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    if (usernameExists) {
      throw new ConflictException('Username already exists');
    }

    const user = await this.userRepository.createUser(createUserDto);
    return this.mapToDto(user);
  }

  //  find single user
  async findSingleUser(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.mapToDto(user);
  }

  //   find all users
  public async findAllUsers(query: UserQueryDto) {
    const { page, limit, search, role } = query;
    let users;

    if (role) {
      users = await this.userRepository.findUserByRole(role);
    } else {
      users = await this.userRepository.findAllWithPagination(
        page,
        limit,
        search,
      );
    }

    return {
      ...users,
      users: users.users.map((user) => this.mapToDto(user)),
    };
  }

  //   update user
  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
    currentUser: any,
  ): Promise<UserResponseDto> {
    // Check if user exists
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Only allow users to update their own profile unless they're admin
    if (currentUser.id !== id && currentUser.role !== 'admin') {
      throw new BadRequestException('You can only update your own profile');
    }

    // Check if email is being changed and verify it's not taken
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailExists = await this.userRepository.emailExists(
        updateUserDto.email,
      );
      if (emailExists) {
        throw new ConflictException('Email already exists');
      }
    }

    // Check if username is being changed and verify it's not taken
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const usernameExists = await this.userRepository.usernameExists(
        updateUserDto.username,
      );
      if (usernameExists) {
        throw new ConflictException('Username already exists');
      }
    }

    const updatedUser = await this.userRepository.updateUser(id, updateUserDto);
    return this.mapToDto(updatedUser);
  }

  // change user password
  async changeUserPassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
    currentUser: any,
  ): Promise<void> {
    // Only allow users to change their own password unless they're admin
    if (currentUser.id !== id && currentUser.role !== 'admin') {
      throw new BadRequestException('You can only change your own password');
    }

    const success = await this.userRepository.changePassword(
      id,
      changePasswordDto.currentPassword,
      changePasswordDto.newPassword,
    );

    if (!success) {
      throw new BadRequestException('Current password is incorrect');
    }
  }

  //   delete user
  async removeUser(id: string, currentUser: any): Promise<void> {
    // Only allow admins to delete users
    if (currentUser.role !== 'admin') {
      throw new BadRequestException('Only admins can delete users');
    }
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.softDelete(id);
  }

  private mapToDto(user: any): UserResponseDto {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }
}
