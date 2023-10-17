import { HttpAdapterHost } from '@nestjs/core';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DatabaseModule } from 'src/api/database/database.module';
import { requestWithAdminPermission } from './helpers/auth.helper';

import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { areaCRUD, practiceCRUD, serviceCRUD } from './helpers/category.helper';
import { fullClean } from './helpers/full-clean.helper';

const mockUser = {
  email: `c@gmail.com`,
  password: '123QWE_qwe!@#13',
  accessToken: '',
  refreshToken: '',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();

    app = await moduleFixture.createNestApplication();

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

    await app.init();
    await app.listen(3000 + Math.floor(Math.random() * 30 + 3));
    await fullClean(app);
  });

  it('should test area CRUD', async () => {
    const reqWithAdminPermission = requestWithAdminPermission(
      app,
      null,
      mockUser,
    );
    await reqWithAdminPermission(areaCRUD);
  });

  it('should test service CRUD', async () => {
    const reqWithAdminPermission = requestWithAdminPermission(
      app,
      null,
      mockUser,
    );
    await reqWithAdminPermission(serviceCRUD);
  });

  it('should test practice CRUD', async () => {
    const reqWithAdminPermission = requestWithAdminPermission(
      app,
      null,
      mockUser,
    );
    await reqWithAdminPermission(practiceCRUD);
  });

  afterAll(async () => {
    return await app.close();
  });
});
