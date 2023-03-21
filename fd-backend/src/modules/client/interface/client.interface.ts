import { IPackageRef } from 'src/modules/package/interface/package.interface';

export interface IClient {
  fullName: string;
  packages: IPackageRef[];
  adress: IAdress;
}

export interface IAdress {
  city: string;
  street: string;
  number: string;
  reference: string;
}

export interface IClientRef {
  _id: string;
  fullName: string;
  adress: IAdress;
}
