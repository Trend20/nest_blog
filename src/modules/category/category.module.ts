import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { DatabaseModule } from '../../common/database';
import { CategoryRepository } from '../../common/database/repositories/category.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
  exports: [CategoryRepository, CategoryService],
})
export class CategoryModule {}
