import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {}
