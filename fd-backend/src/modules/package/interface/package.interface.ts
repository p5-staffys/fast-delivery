import { ObjectId } from 'mongoose';
import { IClientRef } from '../../../common/modules/client/interface/client.interface';
import { IUserRef } from '../../user/interfaces/user.interface';

export interface IPackage {
  _id: string;
  weight: number;
  deliveredBy: IUserRef;
  client: IClientRef;
  deliveryDate: Date;
  deliveredOn: Date;
  status: PackageStatus;
  quantity: number;
}

export interface IPackageRef {
  _id: ObjectId;
  client: IClientRef;
  deliveryDate: Date;
  status: PackageStatus;
  quantity: number;
}

export enum PackageStatus {
  New = 'new',
  Pending = 'pending',
  Delivering = 'delivering',
  Delivered = 'delivered',
  Failed = 'failed',
}

export interface IPackageQuery {
  deliveryDate: { $gte: Date; $lte: Date };
  status?: {
    $eq: PackageStatus;
  };
}
