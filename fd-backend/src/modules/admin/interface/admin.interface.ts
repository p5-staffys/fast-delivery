import { IPackageRef } from '../../package/interface/package.interface';

export interface IAdmin {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  type: AdminType;
  packages: IPackageRef[];
  __v: number;
}

export enum AdminType {
  Admin = 'admin',
  SuperAdmin = 'super-admin',
}

export interface IAdminRef {
  _id: string;
  fullName: string;
}
