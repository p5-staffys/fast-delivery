import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { IAdmin, IAdminRef, AdminType } from '../interfaces/admin.interface';
import { IPackageRef } from '../../package/interface/package.interface';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin implements Partial<IAdmin> {
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

  @Prop({ type: String, default: 'admin' })
  type: AdminType;

  @Prop({ type: [], default: [] })
  packages: IPackageRef[];
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

@Schema()
export class AdminRef implements IAdminRef {
  @Prop({ required: true, type: String, unique: false })
  _id: string;

  @Prop({ required: true, type: String })
  fullName: string;
}

export const AdminefSchema = SchemaFactory.createForClass(AdminRef);
