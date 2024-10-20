import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  AUTHOR = 'author',
  READER = 'reader',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Username must be at least 3 characters long' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 3 characters long' })
  password: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'Role must be either admin, author, or reader' })
  role: string[];
}
