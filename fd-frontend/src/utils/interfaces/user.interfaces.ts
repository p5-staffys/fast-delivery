import { PackageRef, PackageLogs } from "./package.interfaces";

export interface Form {
  bebidasAlcoholicas: boolean;
  medicamentosPsicoactivos: boolean;
  problemaEmocional: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  status: string;
  rating: number;
  forms: Form[];
  __v: number;
  packages: PackageRef[];
}

export interface UserLogs {
  activeUsers: number;
  totalUsersCount: number;
}

export interface Logs {
  date: string;
  users: UserLogs;
  packages: PackageLogs;
}
