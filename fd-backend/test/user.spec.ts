import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

import {
  IUser,
  UserStatus,
} from '../src/modules/user/interface/user.interface';

describe('User Routes', () => {
  let app: INestApplication;
  let user: Partial<IUser>;
  let newUser: Partial<IUser>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    user = {
      name: 'prueba',
      lastName: 'prueba',
      email: 'prueba@prueba.com',
    };
    newUser = {
      name: 'prueba',
      lastName: 'prueba',
      email: 'prueba@prueba.com',
      status: UserStatus.Inactive,
      rating: 5,
      packages: [],
    };
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Create User', () => {
    xit('Create User', async () => {
      const response = await request(app.getHttpServer())
        .post('/user')
        .send(user);

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(newUser);
      expect(response.body.password).toBeFalsy;
    });

    xit('Create User with repeated email', async () => {
      const response = await request(app.getHttpServer())
        .post('/user')
        .send({ ...user, _id: '2' });

      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual('Bad Request');
      expect(response.body.message).toEqual(
        'Un usuario ya se encuentra registrado con ese correo',
      );
    });

    xit('Create User without email', async () => {
      const response = await request(app.getHttpServer())
        .post('/user')
        .send({ ...user, email: '' });

      expect(response.status).toEqual(422);
      expect(response.body.error).toEqual('Unprocessable Entity');
      expect(response.body.message[1]).toEqual('email should not be empty');
    });

    xit('Create User without name', async () => {
      const response = await request(app.getHttpServer())
        .post('/user')
        .send({ ...user, name: '' });

      expect(response.status).toEqual(422);
      expect(response.body.error).toEqual('Unprocessable Entity');
      expect(response.body.message[1]).toEqual('name should not be empty');
    });

    xit('Create User without lastname', async () => {
      const response = await request(app.getHttpServer())
        .post('/user')
        .send({ ...user, lastName: '' });

      expect(response.status).toEqual(422);
      expect(response.body.error).toEqual('Unprocessable Entity');
      expect(response.body.message[1]).toEqual('lastName should not be empty');
    });

    xit('Create User without password', async () => {
      const response = await request(app.getHttpServer())
        .post('/user')
        .send({ ...user, password: '' });

      expect(response.status).toEqual(422);
      expect(response.body.error).toEqual('Unprocessable Entity');
      expect(response.body.message[1]).toEqual('password should not be empty');
    });
  });

  describe('SignIn', () => {
    xit('SignIn User', async () => {
      const response = await request(app.getHttpServer())
        .post('/user/singin')
        .send({ email: 'prueba@prueba.com', password: 'password' });

      expect(response.status).toEqual(200);
      expect(response.body.name).toEqual('prueba');
      expect(response.body.password).toBeFalsy;
      expect(response.body.cookie).toBeTruthy;
    });

    xit('SingIn with wrong wrong email', async () => {
      const response = await request(app.getHttpServer())
        .post('/user/singin')
        .send({ email: 'prueba@prueba.com', password: 'wrongpassword' });

      expect(response.status).toEqual(401);
      expect(response.body.message).toEqual(
        "Email doesn't correspond to a registered user",
      );
    });

    xit('SingIn with wrong wrong password', async () => {
      const response = await request(app.getHttpServer())
        .post('/user/singin')
        .send({ email: 'wrongprueba@prueba.com', password: 'password' });

      expect(response.status).toEqual(401);
      expect(response.body.message).toEqual('Password is incorrect');
    });

    xit('SignOut User', async () => {
      const response = await request(app.getHttpServer()).post('/user/singout');

      expect(response.status).toEqual(200);
    });
  });

  describe('Return Information', () => {
    xit('Return User by _id', async () => {
      const response = await request(app.getHttpServer()).get('/user/1');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(newUser);
    });
  });

  describe('Update User', () => {
    xit('Update User Name', async () => {
      const response = await request(app.getHttpServer()).post('/user/1').send({
        name: 'nueva prueba',
      });

      expect(response.status).toEqual(200);
      expect(response.body.name).toEqual('nueva prueba');
    });

    xit('Update User lastName', async () => {
      const response = await request(app.getHttpServer()).post('/user/1').send({
        lastName: 'nueva prueba',
      });

      expect(response.status).toEqual(200);
      expect(response.body.lastName).toEqual('nueva prueba');
    });
  });

  describe('Remove User', () => {
    xit('Remove User', async () => {
      const response = await request(app.getHttpServer()).delete('/user/1');

      expect(response.status).toEqual(200);
      expect(response.body.email).toEqual(newUser.email);
    });

    xit('Return Removed User', async () => {
      const response = await request(app.getHttpServer()).get('/user/1');

      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual('Bad Request');
      expect(response.body.message).toEqual(
        'No hay un usuario registrado con ese _id',
      );
    });
  });
  describe('Users Pacakges', () => {
    xit('Return Users packages', async () => {
      const response = await request(app.getHttpServer()).get('/user/1');

      expect(response.status).toEqual(200);
      expect(response.body.pacakes[0]).toEqual({});
    });
  });
});
