import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ enum: ['admin', 'user'] })
  role: 'admin' | 'user';

  @Prop()
  phone: string;

  @Prop()
  picture: string;

  @Prop()
  address: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop([String])
  auths: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);


