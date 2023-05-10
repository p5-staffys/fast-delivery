import { Package, PackageRef } from "../interfaces/package.interfaces";
import { faker } from "@faker-js/faker";

export type Admin = {
  _id: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
};

function createAdmin(email: string): Admin {
  return {
    _id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    email,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
}

async function logInAdmin(email: string): Promise<Admin> {
  return createAdmin(email);
}

export type User = {
  _id: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  rating: number;
  status: string;
};

function createRepa(email: string): User {
  return {
    _id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    email,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    rating: Math.floor(Math.random() * 5),
    status: faker.helpers.arrayElement(["active", "inactive", "ended"]),
  };
}

async function logInUser(email: string): Promise<User> {
  return createRepa(email);
}

export type Pack = {
  _id: string;
  status: string;
  peso: number;
  destination: string;
  client: string;
  deliveryDate: Date;
  deliveredOn: Date;
};

function createPack(): Package {
  return {
    _id: faker.datatype.uuid(),
    status: faker.helpers.arrayElement(["pending", "delivered", "delivering"]),
    weight: faker.datatype.number({ min: 100, max: 10000, precision: 100 }),
    destination: faker.address.streetAddress(),
    client: {
      fullName: faker.name.firstName(),
      address: { number: "1", street: "calle falsa 123", city: "fake city", state: "fake state", country: "fakeland" },
      latlng: { lat: 1, lng: 1 },
    },
    deliveryDate: faker.date.recent(3).toDateString(),
    deliveredOn: faker.date.recent(3).toDateString(),
    quantity: 10,
    deliveredBy: null,
  };
}

function createPackRef(): PackageRef {
  return {
    _id: faker.datatype.uuid(),
    status: faker.helpers.arrayElement(["pending", "delivered", "delivering"]),
    client: {
      fullName: "Pepe Argento",
      address: {
        number: "123",
        street: "Calle Falsa",
        city: "Springfield",
        state: "Massachusetts",
        country: "EE.UU.",
      },
      latlng: {
        lat: -34.6275341,
        lng: -58.42854939999999,
      },
    },
    deliveryDate: faker.date.recent(3),
  };
}

async function requestPacks(cant: number): Promise<Package[]> {
  const packs: Package[] = [];
  for (let i = 0; i < cant; i++) {
    packs.push(createPack());
  }
  return packs;
}

async function requestPackRefs(cant: number): Promise<PackageRef[]> {
  const packs: PackageRef[] = [];
  for (let i = 0; i < cant; i++) {
    packs.push(createPackRef());
  }
  return packs;
}

async function requestUsers(cant: number): Promise<User[]> {
  const packs: User[] = [];
  for (let i = 0; i < cant; i++) {
    packs.push(createRepa("seed@seed.com"));
  }
  return packs;
}

async function getPercentage(): Promise<number> {
  return faker.datatype.number({ min: 0, max: 100, precision: 10 });
}

export { logInUser, logInAdmin, requestPacks, requestUsers, getPercentage, requestPackRefs };
