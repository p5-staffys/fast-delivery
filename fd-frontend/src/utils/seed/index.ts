import { faker } from "@faker-js/faker";

class User {}

function createAdmin(email: string): User {
  return {
    _id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    email,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
}

function createRepa(email: string): User {
  return {
    _id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    email,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    rating: Math.floor(Math.random() * 5),
  };
}

async function logIn(email: string, admin: boolean) {
  if (admin) return createAdmin(email);
  return createRepa(email);
}

class Pack {}

function createPack(): Pack {
  return {
    _id: faker.datatype.uuid(),
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
    packs.push(createPack());
  }
  return packs;
}

export { logIn, requestPacks };
