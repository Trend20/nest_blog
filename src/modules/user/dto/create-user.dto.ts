import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'admin',
  AUTHOR = 'author',
  READER = 'reader',
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Username must be at least 3 characters long' })
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 3 characters long' })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'Role must be either admin, author, or reader' })
  role: string[];
}
