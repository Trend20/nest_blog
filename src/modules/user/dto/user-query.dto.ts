import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UserQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(['admin', 'author', 'reader'])
  role?: string;
}
