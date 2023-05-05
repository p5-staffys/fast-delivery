import { IPackageRef } from '../../package/interface/package.interface';
import { IFormApply } from '../../../common/modules/formApply/interface/form-apply.interface';
import { User } from '../entities/user.entity';
import { Package } from 'src/modules/package/entities/package.entity';

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
  email: string;
  fullName: string;
}

export interface assignPacakges {
  updatedUser: User;
  errors: string[];
}

export interface deliverPackages {
  updatedUser: User;
  updatedPackages: Package[];
}
