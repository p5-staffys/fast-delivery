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
    //cargar la base de datos
  });

  afterAll(async () => {
    await app.close();
  });

  it('mock', async () => {
    expect(true).toBeTruthy;
  });

  xit('Returns users', async () => {
    const response = await request(app.getHttpServer()).get('/admin/users');

    expect(response.status).toEqual(200);
    expect(response.body[0]);
  });

  xit('Returns packages', async () => {
    const response = await request(app.getHttpServer()).get('/admin/pacakes');

    expect(response.status).toEqual(200);
    expect(response.body[0]);
  });

  xit('Returns amount of active users ', async () => {
    const response = await request(app.getHttpServer()).get(
      '/admin/activeUsers',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ users: 2, active: 1 });
  });

  xit('Returns amount of active packages', async () => {
    const response = await request(app.getHttpServer()).get(
      '/admin/activePackages',
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
