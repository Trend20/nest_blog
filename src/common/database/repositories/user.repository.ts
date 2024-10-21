import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { BaseRepository } from './base.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../../modules/user/dto/create-user.dto';
import { UpdateUserDto } from '../../../modules/user/dto/update-user.dto';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  //   create user
  public async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser.save();
  }

  //   find user by id
  public async findUserById(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ id }).exec();
  }

  //   find user by email
  public async findUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  //   find user by username
  public async findUserByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec();
  }

  // find user by role
  public async findUserByRole(role: string): Promise<UserDocument> {
    return this.userModel.findOne({ role }).exec();
  }

  // refresh token
  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken }).exec();
  }

  //   update user
  public async updateUser(
    userId: string | Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    //   if password is included, has it
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }
    return await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .exec();
  }

  // find users with pagination
  async findAllWithPagination(
    page: number = 1,
    limit: number = 10,
    searchTerm?: string,
  ): Promise<{
    total: Array<HydratedDocument<UserDocument, {}, {}>> | number;
    totalPages: number;
    page: number;
    users: Array<HydratedDocument<UserDocument, {}, {}>> | number;
  }> {
    const query: any = {};

    // Add search functionality
    if (searchTerm) {
      query.$or = [
        { username: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.userModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.userModel.countDocuments(query),
    ]);

    return {
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  // change user password
  async changePassword(
    userId: string | Types.ObjectId,
    currentPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    const user = await this.userModel.findById(userId).select('+password');
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      return false;
    }

    user.password = await this.hashPassword(newPassword);
    await user.save();
    return true;
  }
  //   delete user
  // Soft delete user (if needed)
  async softDelete(userId: string | Types.ObjectId): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        { isActive: false, deletedAt: new Date() },
        { new: true },
      )
      .exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  // Restore soft-deleted user
  async restoreUser(userId: string | Types.ObjectId): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        { isActive: true, deletedAt: null },
        { new: true },
      )
      .exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  // Check if email exists
  async emailExists(email: string): Promise<boolean> {
    const count = await this.userModel.countDocuments({ email });
    return count > 0;
  }

  // Check if username exists
  async usernameExists(username: string): Promise<boolean> {
    const count = await this.userModel.countDocuments({ username });
    return count > 0;
  }

  // Find active users
  async findActiveUsers(): Promise<UserDocument[]> {
    return this.userModel.find({ isActive: true }).exec();
  }

  // Bulk update user roles
  async bulkUpdateRoles(
    userIds: string[] | Types.ObjectId[],
    role: string,
  ): Promise<number> {
    const result = await this.userModel.updateMany(
      { _id: { $in: userIds } },
      { $set: { role } },
    );
    return result.modifiedCount;
  }

  // Private helper method to hash passwords
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  // Example aggregation: Get user statistics by role
  async getUserStatsByRole(): Promise<Array<{ role: string; count: number }>> {
    return this.userModel.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          role: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ]);
  }
}
