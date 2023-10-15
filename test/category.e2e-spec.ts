import { HttpAdapterHost } from '@nestjs/core';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DatabaseModule } from 'src/api/database/database.module';
import { validate } from 'class-validator';
import { SignInDto } from 'src/api/auth/dto/sign-in.dto';
import { ResendVerifyKey } from 'src/api/auth/dto/resend-verify-key.dto';
import { fullLogin, fullLogout, fullReset, fullSignUp, logoutUser, refreshToken, resendVerify, signIn, signIn404, signUpAdmin, userControl, verifyUserSignIn, requestWithAdminPermission } from './helpers/auth.helper';
import {  activeSession, blockSession, deleteSession, getSession } from './helpers/kv-store.helper';
import { clearUser, deleteSelf, getSelfBadRequest, getSelfF, getUserByEmail } from './helpers/user.helper';
import { CreateUserDto } from 'src/api/auth/dto/create-person.dto';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { STRONG_PASSWORD } from './constants/test.constants';
import { areaCRUD, clearCategory, practiceCRUD, serviceCRUD } from './helpers/category.helper';
import { fullClean } from './helpers/full-clean.helper';


const mockUser = {
  email: `u@gmail.com`,
  password: '123QWE_qwe!@#13', 
  accessToken: '',
  refreshToken: ''
}

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();
    
    app = await  moduleFixture.createNestApplication();
    
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

    await app.init();
    await app.listen(3000 + Math.floor(Math.random() * 10 + 22));

    //await fullClean(app)
  });
  
  it('should test area CRUD', async () => {
    const reqWithAdminPermission = requestWithAdminPermission(app, null, mockUser)
    await reqWithAdminPermission(areaCRUD)
  });

  it('should test service CRUD', async () => {
    const reqWithAdminPermission = requestWithAdminPermission(app, null, mockUser)
    await reqWithAdminPermission(serviceCRUD)
  });

  it('should test practice CRUD', async () => {
    const reqWithAdminPermission = requestWithAdminPermission(app, null, mockUser)
    await reqWithAdminPermission(practiceCRUD)
  });

  afterAll(async () => {
    //await fullClean(app)
    return await app.close()
  })

});