import { IPackageRef } from '../../package/interface/package.interface';
import { IFormDB } from '../../../common/modules/formApply/interface/form-apply.interface';
import { User, UserDocument } from '../entities/user.entity';
import {
  Package,
  PackageDocument,
} from 'src/modules/package/entities/package.entity';

export interface IUser {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  status: UserStatus;
  active: boolean;
  rating: number;
  packages: IPackageRef[];
  forms: IFormDB[];
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

export interface IAssignPacakges {
  updatedUser: User;
  errors: string[];
}

export interface IDeliverPackages {
  updatedUser: User;
  updatedPackages: Package[];
}

export interface IUnassignPackage {
  updatedUser: UserDocument;
  updatedPacakge: PackageDocument;
}

export interface IAddForm {
  ok: boolean;
  message: string;
}
