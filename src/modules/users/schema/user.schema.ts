import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

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
