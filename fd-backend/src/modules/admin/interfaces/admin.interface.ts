import { IPackageRef } from '../../package/interface/package.interface';

export interface IAdmin {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  packages: IPackageRef[];
  avatarURL: string;
  type: AdminType;
}

export enum AdminType {
  Admin = 'admin',
  SuperAdmin = 'super-admin',
}

export interface IAdminRef {
  _id: string;
  fullName: string;
}
