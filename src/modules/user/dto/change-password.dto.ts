import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Current password must be at least 6 characters long',
  })
  currentPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  newPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Password confirmation must be at least 6 characters long',
  })
  confirmPassword: string;
}
