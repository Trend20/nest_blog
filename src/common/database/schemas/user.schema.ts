import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  role: 'admin' | 'author' | 'reader';

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  title: string;

  @Prop({ required: true, unique: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
