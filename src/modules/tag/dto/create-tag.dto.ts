import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slug: string;
}
