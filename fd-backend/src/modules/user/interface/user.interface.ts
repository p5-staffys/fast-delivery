import { IPackageRef } from '../../package/interface/package.interface';

export interface IUser {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  status: UserStatus;
  rating: number;
  packages: IPackageRef[];
  __v: number;
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export interface IUserRef {
  _id: string;
  fullName: string;
}
