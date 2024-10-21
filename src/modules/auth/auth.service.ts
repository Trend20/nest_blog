import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../common/database/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(loginUserDto: LoginDto): Promise<any> {
    const user = await this.userRepository.findUserByUsername(
      loginUserDto.username,
    );
    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUserDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const newUser = await this.userRepository.create({
      ...registerUserDto,
      password: hashedPassword,
    });
    const { password: _, ...result } = newUser.toObject();
    return result;
  }
}
