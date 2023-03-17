import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Admin Routes', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  xit('Returns users', async () => {
    const response = await request(app.getHttpServer()).get('/admin/users');

    expect(response.status).toEqual(200);
    expect(response.body[0]._id).toEqual(
      '9c29aa04-b1e4-4b8d-9cc0-962ea9df70f4',
    );
  });

  xit('Returns packages', async () => {
    const response = await request(app.getHttpServer()).get('/admin/pacakes');

    expect(response.status).toEqual(200);
    expect(response.body[0]._id).toEqual('640a6816d1093300fb683453');
  });

  xit('Returns amount of active users ', async () => {
    const response = await request(app.getHttpServer()).get(
      '/admin/active_users',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ users: 2, active: 1 });
  });

  xit('Returns amount of active packages', async () => {
    const response = await request(app.getHttpServer()).get(
      '/admin/active_packages',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ packages: 2, delivered: 1 });
  });

  xit('Deactivate User', async () => {
    const response = await request(app.getHttpServer()).put('/admin/status/1');

    expect(response.body.status).toEqual('inactive');
  });

  xit('Activate User', async () => {
    const response = await request(app.getHttpServer()).put('/admin/status/1');

    expect(response.body.status).toEqual('active');
  });
});
