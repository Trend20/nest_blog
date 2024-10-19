import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../../users/schema/user.schema';
import * as mongoose from 'mongoose';
import { Tag } from '../../tags/schema/tag.schema';
import { Category } from '../../categories/schema/category.schema';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categories: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' })
  tags: Tag;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
