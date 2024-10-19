import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { DatabaseModule } from '../../common/database';

@Module({
  imports: [DatabaseModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
