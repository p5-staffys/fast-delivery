import { AddressDTO } from '../../../common/modules/address/dto/Address.dto';
import { IClient } from '../../../common/modules/client/interface/client.interface';
import { IUserRef } from '../../user/interfaces/user.interface';

export interface IPackage {
  _id: string;
  weight: number;
  deliveredBy: IUserRef;
  client: IClient;
  deliveryDate: Date;
  deliveredOn: Date;
  status: PackageStatus;
  quantity: number;
}

export interface IPackageRef {
  _id: string;
  address: AddressDTO;
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
