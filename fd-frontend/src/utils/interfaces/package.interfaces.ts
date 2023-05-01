export interface PackageRef {
  _id: string;
  status: string;
  address: string;
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
  quantity: number;
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
