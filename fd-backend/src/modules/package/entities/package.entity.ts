import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IUserRef } from '../../user/interfaces/user.interface';

import {
  IPackage,
  IPackageRef,
  PackageStatus,
} from '../interface/package.interface';

import { UserRefSchema } from '../../user/entities/user.entity';
import {
  ClientRef,
  ClientSchema,
} from '../../../common/modules/client/entities/client.entity';
import {
  IClientRef,
  IClient,
} from '../../../common/modules/client/interface/client.interface';

export type PackageDocument = HydratedDocument<Package>;

@Schema({ timestamps: true, versionKey: false })
export class Package implements Partial<IPackage> {
  @Prop({ required: true, type: Number })
  readonly weight: number;

  @Prop({ required: true, type: UserRefSchema })
  readonly createdBy: IUserRef;

  @Prop({ default: null, type: UserRefSchema })
  deliveredBy: IUserRef | null;

  @Prop({ required: true, type: ClientSchema })
  readonly client: IClient;

  @Prop({ required: true, type: Date })
  readonly deliveryDate: Date;

  @Prop({ type: Date, default: null })
  readonly deliveredOn: Date | null;

  @Prop({ type: String, default: PackageStatus.Pending })
  status: PackageStatus;

  @Prop({ type: Number, default: 1 })
  readonly quantity: number;

  @Prop({ type: Boolean, default: true })
  showHistory: boolean;
}

export const PackageSchema = SchemaFactory.createForClass(Package);

@Schema()
export class PackageRef implements IPackageRef {
  @Prop({ required: true, type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true, type: ClientRef })
  client: IClientRef;

  @Prop({ required: true, type: String })
  deliveryDate: Date;

  @Prop({ type: String, default: PackageStatus.Pending })
  readonly status: PackageStatus;

  @Prop({ type: Number, default: 1 })
  readonly quantity: number;
}

export const PackageRefSchema = SchemaFactory.createForClass(PackageRef);
