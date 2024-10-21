import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Blog')
@Controller('blogs')
export class BlogController {}
