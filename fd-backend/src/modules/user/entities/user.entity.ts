import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { IUser } from '../interface/user.interface';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  @Prop({ required: true, type: String, unique: true })
  readonly _id: string;

  @Prop({ type: String })
  readonly name: string;

  @Prop({ type: String })
  readonly lastName: string;

  @Prop({
    required: [true, 'Please enter Email Address'],
    type: String,
    unique: true,
  })
  readonly email: string;
}

export const userSchema = SchemaFactory.createForClass(User);
