import { Types } from 'mongoose';
import {
  IClientRef,
  IClient,
} from '../../../common/modules/client/interface/client.interface';
import { IUserRef } from '../../user/interfaces/user.interface';

export interface IPackage {
  _id: string;
  weight: number;
  deliveredBy: IUserRef;
  client: IClient;
  deliveryDate: Date;
  deliveredOn: Date;
  status: PackageStatus;
}

export interface IPackageRef {
  _id: Types.ObjectId;
  client: IClientRef;
  deliveryDate: Date;
  status: PackageStatus;
}

export enum PackageStatus {
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
