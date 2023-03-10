import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  IUserRef,
  IClientRef,
} from 'src/modules/user/interface/user.interface';
import {
  IPackage,
  IPackageRef,
  PackageStatus,
} from '../interface/package.interface';

import { UserRefSchema } from 'src/modules/user/entities/user.entity';

export type PackageDocument = HydratedDocument<Package>;

@Schema()
export class Package implements Partial<IPackage> {
  @Prop({ required: true, type: Number })
  readonly weight: number;

  @Prop({ required: true, type: UserRefSchema })
  readonly createdBy: IUserRef;

  @Prop({ default: {}, type: UserRefSchema })
  readonly deliveredBy: IUserRef;

  @Prop({ required: true, type: Object })
  readonly client: IClientRef;

  @Prop({ required: true, type: Date })
  readonly deliveryDate: Date;

  @Prop({ type: Date })
  readonly deliveredOn: Date;

  @Prop({ type: String, default: PackageStatus.Pending })
  readonly status: PackageStatus;
}

export const PackageSchema = SchemaFactory.createForClass(Package);

@Schema()
export class PackageRef implements IPackageRef {
  @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true, type: String })
  adress: string;

  @Prop({ required: true, type: String })
  deliveryDate: Date;

  @Prop({ type: String, default: PackageStatus.Pending })
  readonly status: PackageStatus;
}

export const PackageRefSchema = SchemaFactory.createForClass(PackageRef);
