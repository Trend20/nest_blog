import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from '../schemas/blog.schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class BlogRepository extends BaseRepository<BlogDocument> {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {
    super(blogModel);
  }
}
