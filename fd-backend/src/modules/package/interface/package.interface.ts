import {
  IUserRef,
  IClientRef,
} from 'src/modules/user/interface/user.interface';

export interface IPackage {
  _id: string;
  weight: number;
  createdBy: IUserRef;
  deliveredBy: IUserRef;
  client: IClientRef;
  deliveryDate: Date;
  deliveredOn: Date;
  status: PackageStatus;
}

export interface IPackageRef {
  _id: string;
  adress: string;
  deliveryDate: Date;
  status: PackageStatus;
}

export enum PackageStatus {
  Pending = 'pending',
  Delivering = 'delivering',
  Delivered = 'delivered',
  Failed = 'failed',
}
