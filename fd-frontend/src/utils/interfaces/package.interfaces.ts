export interface PackageRef {
  _id: string;
  status: PackageStatus;
  client: ClientRef;
  deliveryDate: string;
}

export interface Package {
  _id: string;
  status: string;
  weight: number;
  destination: string;
  client: Client;
  deliveryDate: string;
  deliveredOn: string | null;
  deliveredBy: string | null;
  quantity: number;
}

export interface PackageCreate {
  weight: number;
  client: Client;
  deliveryDate: string;
}

export interface Client {
  fullName: string;
  address: Address;
  latlng: google.maps.LatLngLiteral;
}

export interface ClientRef {
  fullName: string;
  address: string;
}

export interface Address {
  number: string;
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface PackageLogs {
  deliveredPackages: number;
  totalPackages: number;
}

export interface IPackagesByClient {
  _id: Client;
  packages: Package[];
}

export enum PackageStatus {
  Pending = "Pendiente",
  Delivering = "En viaje",
  Delivered = "Entregado",
  Failed = "Cancelado",
}
