import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { IUser } from '../interface/user.interface';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';
export type UserDocument = Document & User;

@Schema()
export class User implements IUser {
  readonly _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  readonly name: string;

  @Prop({
    required: [true, 'Please enter Email Address'],
    type: String,
    unique: true,
    lowercase: true,
  })
  readonly email: string;
  @Prop({
    required: [true, 'Please enter a password'],
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
  })
  @ExcludeProperty()
  password: string;

  //Hook Automatic For hash
  static async hashPassword(user: UserDocument): Promise<void> {
    if (!user.password) {
      return;
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.pre<UserDocument>('save', async function (next) {
  await User.hashPassword(this);
  next();
});
