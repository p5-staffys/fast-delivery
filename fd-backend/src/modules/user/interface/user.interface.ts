import { IPackageRef } from '../../package/interface/package.interface';
import { IFormApply } from 'src/common/modules/formApply/interface/form-apply.interface';

export interface IUser {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  status: UserStatus;
  rating: number;
  packages: IPackageRef[];
  forms: IFormApply[];
  __v: number;
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export interface IUserRef {
  _id: string;
  name: string;
  lastName: string;
}
