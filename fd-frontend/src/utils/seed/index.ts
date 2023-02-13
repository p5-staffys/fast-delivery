import { faker } from "@faker-js/faker";

class User {}

function createAdmin(email: string): User {
  return {
    _id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    email,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    hasAssigned: [
      createPack(100),
      createPack(101),
      createPack(102),
      createPack(103),
    ],
  };
}

function createRepa(email: string): User {
  return {
    _id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    email,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    delivering: [createPack(102), createPack(103), createPack(104)],
    delivered: [createPack(100), createPack(101)],
    rating: Math.floor(Math.random() * 5),
  };
}

async function logIn(email: string, admin: boolean) {
  if (admin) return createAdmin(email);
  return createRepa(email);
}

class Pack {}

function createPack(_id: number): Pack {
  return {
    _id: _id,
    status: faker.helpers.arrayElement([
      "pending",
      "assigned",
      "delivering",
      "delivered",
      "failed",
    ]),
    peso: faker.datatype.number({ min: 100, max: 10000, precision: 100 }),
    destination: faker.address.streetAddress(),
    client: faker.name.fullName(),
    deliveryDate: faker.date.recent(3),
    deliveredOn: faker.date.recent(3),
  };
}

async function requestPacks(cant: number) {
  let packs = [];
  for (let i = 0; i < cant; i++) {
    packs.push(createPack(100 + i));
  }
  return packs;
}

export { logIn, requestPacks };
