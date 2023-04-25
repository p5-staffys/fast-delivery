import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { IUser, IUserRef, UserStatus } from '../interfaces/user.interface';
import { IPackageRef } from '../../package/interface/package.interface';
import { formRefSchema } from '../../../common/modules/formApply/entities/form-apply.entitie';
import { IFormApply } from '../../../common/modules/formApply/interface/form-apply.interface';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements Partial<IUser> {
  @Prop({ required: true, type: String, unique: true })
  readonly _id: string;

  @Prop({ required: [true, 'Please enter a name'], type: String })
  readonly name: string;

  @Prop({ required: [true, 'Please enter a lastname'], type: String })
  readonly lastName: string;

  @Prop({
    required: [true, 'Please enter Email Address'],
    type: String,
    unique: true,
  })
  readonly email: string;

  @Prop({ type: String, default: 'inactive' })
  status: UserStatus;

  @Prop({ type: Boolean, default: false })
  active: boolean;

  @Prop({ type: Number, default: 5 })
  rating: number;

  @Prop({ type: Array, default: [] })
  packages: IPackageRef[];

  @Prop({ type: [formRefSchema], default: [] })
  forms: IFormApply[];
}

export const UserSchema = SchemaFactory.createForClass(User);

@Schema()
export class UserRef implements IUserRef {
  @Prop({ required: true, type: String, unique: false })
  _id: string;

  @Prop({ required: [true, 'Please enter a name'], type: String })
  readonly name: string;

  @Prop({ required: [true, 'Please enter a lastname'], type: String })
  readonly lastName: string;
}

export const UserRefSchema = SchemaFactory.createForClass(UserRef);
