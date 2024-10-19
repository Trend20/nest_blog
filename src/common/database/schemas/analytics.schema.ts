import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Blog } from './blog.schema';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Analytics {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Blog;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  uniqueVisitors: number;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
