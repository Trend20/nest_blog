import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true, collection: 'categories' })
export class Category extends Document {
  @Prop()
  name: string;

  @Prop()
  slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
