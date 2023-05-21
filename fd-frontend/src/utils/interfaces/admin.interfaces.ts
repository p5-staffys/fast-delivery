import { PackageRef } from "./package.interfaces";

export interface Admin {
  active: boolean;
  avatarURL: string;
  _id: string;
  name: string;
  lastName: string;
  email: string;
  type: AdminType;
  packages: PackageRef[];
  __v: number;
}

export enum AdminType {
  Admin = "admin",
  SuperAdmin = "super",
}
