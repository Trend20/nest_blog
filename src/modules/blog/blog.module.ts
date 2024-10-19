import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { DatabaseModule } from '../../common/database';
import { BlogRepository } from '../../common/database/repositories/blog.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [BlogController],
  providers: [BlogRepository, BlogService],
  exports: [BlogRepository, BlogService],
})
export class BlogModule {}
