import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class CategoryRepository extends BaseRepository<CategoryDocument> {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {
    super(categoryModel);
  }
}
