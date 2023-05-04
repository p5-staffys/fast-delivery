import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IUserRef } from '../../user/interfaces/user.interface';

import { IPackageRef, PackageStatus } from '../interface/package.interface';

import { UserRefSchema } from '../../user/entities/user.entity';
import {
  ClientRef,
  ClientSchema,
} from '../../../common/modules/client/entities/client.entity';
import {
  IClient,
  IClientRef,
} from '../../../common/modules/client/interface/client.interface';

export type PackageDocument = HydratedDocument<Package>;

@Schema({ timestamps: true, versionKey: false })
export class Package {
  @Prop({ required: true, type: Number })
  readonly weight: number;

  // Segun figma siempre lo crea el backoffice, verificar si es necesario
  // Respuesta: en el backoffice hay mas de una persona, es util saber quien ingresó el paquete al sistema.

  // @Prop({ required: true, type: UserRefSchema })
  // readonly createdBy: IUserRef;

  @Prop({ default: null, type: UserRefSchema })
  deliveredBy: IUserRef | null;

  @Prop({ required: true, type: ClientSchema })
  readonly client: IClient;

  @Prop({ required: true, type: Date })
  readonly deliveryDate: Date;

  @Prop({ type: Date, default: null })
  readonly deliveredOn: Date | null;

  @Prop({ type: String, default: PackageStatus.New })
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

  @Prop({ type: String, default: PackageStatus.New })
  readonly status: PackageStatus;

  @Prop({ type: Number, default: 1 })
  readonly quantity: number;
}

export const PackageRefSchema = SchemaFactory.createForClass(PackageRef);
