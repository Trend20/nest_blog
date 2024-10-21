import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tag')
@Controller('tags')
export class TagController {}
