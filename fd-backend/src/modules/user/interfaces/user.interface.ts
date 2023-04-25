import { IPackageRef } from '../../package/interface/package.interface';
import { IFormApply } from '../../../common/modules/formApply/interface/form-apply.interface';

export interface IUser {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  status: UserStatus;
  active: boolean;
  rating: number;
  packages: IPackageRef[];
  forms: IFormApply[];
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
