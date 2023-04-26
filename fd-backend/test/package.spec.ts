import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

import { IUser } from '../src/modules/user/interfaces/user.interface';
import {
  IPackage,
  PackageStatus,
} from '../src/modules/package/interface/package.interface';

describe('Package Routes', () => {
  let app: INestApplication;
  let user: Partial<IUser>;
  let newPack: Partial<IPackage>;
  let date: Date;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await request(app.getHttpServer()).post('/user').send(user);

    date = new Date();

    newPack = {
      _id: '1',
      weight: 20,
      client: {
        fullName: 'client client',
        address: {
          street: 'artigas',
        },
      },
      deliveryDate: date,
      deliveredOn: date,
      status: PackageStatus.New,
    };
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Package Creation', () => {
    xit('Create Package', async () => {
      const response = await request(app.getHttpServer())
        .post('/package')
        .send(newPack);

      expect(response.status).toEqual(201);
      expect(response.body.weight).toEqual(20);
      expect(response.body.createdBy).toEqual({
        _id: '1',
        fullName: 'admin admin',
      });
    });

    xit('Return a package by _id', async () => {
      const response = await request(app.getHttpServer()).get('/package/1');

      expect(response.status).toEqual(200);
      expect(response.body._id).toEqual(1);
      expect(response.body.deliveryDate).toEqual(date);
    });

    xit('Assign package to user', async () => {
      const response = await request(app.getHttpServer()).put(
        '/package/1/assign_to/1',
      );

      expect(response.status).toEqual(200);
      expect(response.body.deliveredBy).toEqual(1);
    });

    xit('Unassign package', async () => {
      const response = await request(app.getHttpServer()).put(
        '/package/1/unassign',
      );

      expect(response.status).toEqual(200);
      expect(response.body.deliveredBy).toEqual({});
    });

    xit('Delete Package', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/package/1/delete',
      );

      expect(response.status).toEqual(200);
      expect(response.body._id).toEqual(1);
    });
  });

  describe('Delivering a Package', () => {
    xit('Marks package as delivered', async () => {
      const response = await request(app.getHttpServer()).put(
        '/package/1/delivered',
      );

      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual(PackageStatus.Delivered);
    });

    xit('Blocks a delivered package', async () => {
      const response = await request(app.getHttpServer()).put(
        '/package/1/assign_to/1',
      );

      expect(response.status).toEqual(200);
      expect(response.body.deliveredBy).toEqual({});
    });
  });
});
