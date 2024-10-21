import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(100, { message: 'Title cannot be longer than 100 characters' })
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId({ message: 'Invalid author ID format' })
  author: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId({ message: 'Invalid category ID format' })
  categories: Types.ObjectId;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true, message: 'Invalid tag ID format' })
  tags?: Types.ObjectId[];
}
