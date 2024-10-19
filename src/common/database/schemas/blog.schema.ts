import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';
import { Tag } from './tag.schema';
import { Category } from './category.schema';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true, collection: 'blogs' })
export class Blog extends Document {
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
