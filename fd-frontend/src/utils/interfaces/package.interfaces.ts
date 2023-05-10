export interface PackageRef {
  _id: string;
  status: string;
  client: Client;
  deliveryDate: Date;
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

export interface Address {
  number: string;
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface PackageLogs {
  activePackages: number;
  totalPackages: number;
}
