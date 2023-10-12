import { HttpAdapterHost } from '@nestjs/core';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DatabaseModule } from 'src/api/database/database.module';
import { CreateUserDto } from 'src/api/auth/dto/create-person.dto';
import { validate } from 'class-validator';
import { SignInDto } from 'src/api/auth/dto/sign-in.dto';
import { ResendVerifyKey } from 'src/api/auth/dto/resend-verify-key.dto';
import { AUTH_OK } from 'src/api/auth/constants/auth.constants';
import { UNIQUE_MESSAGE } from 'src/common/constants/app.constants';
import { createUserTest, fullSignUp, logoutUser, refreshToken, requestWithAdminPermission, resendVerify, signIn, signIn404, userControl, userVerify, usersControl } from './helpers/auth.helper';
import { activeSession, blockSession, getSession } from './helpers/kv-store.helper';
import { verifyUserSignUp } from './helpers/auth.helper';
import { 
  clearContentItem,
  clearUser, deleteAnotherF, deleteSelf, 
  getAnotherF, getOtherF, 
  getSelf, getSelfBadRequest, getSelfF, 
  getUserByEmail, updateSelf, updateSelfF } from './helpers/user.helper';
import { UpdateUserDto } from 'src/api/user/dto/update-user.dto';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { clearCategory } from './helpers/category.helper';
import { contentItemF, tagF, tagPracticeCI_F } from './helpers/content-item.helper';
import { educationCRUD, educationERRORS } from './helpers/education.helper';
import { avatarF } from './helpers/image.helper';
import { professionalInterestF } from './helpers/pi.helper';
import { awardsF } from './helpers/award.helper';
import { userCategoryF } from './helpers/user-category.helper';


const mockUser = {
  email: `e2e_user_tst@gmail.com`,
  password: '123QWE_qwe!@#13',
  accessToken: '',
  refreshToken: ''
}

describe('User (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    })
    .compile();

    app = await moduleFixture.createNestApplication();
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
    
    await app.init();
    await app.listen(3000 + Math.floor(Math.random() * 10 + 1));

    await clearUser(app, mockUser)
    const reqWithAdminPermission = requestWithAdminPermission(app, null, mockUser)
    await reqWithAdminPermission(clearCategory)
    await reqWithAdminPermission(clearContentItem)
  });

  // // self
  it('should return account data', async () => {
    const controlFunc = userControl(app, mockUser)
    await controlFunc(getSelfF)

  })

  it('should update account', async () => {
    const controlFunc = userControl(app, mockUser)
    await controlFunc(updateSelfF)
  })

  it('should delete account', async () => {
    const { responseVerifyBody } = await fullSignUp(app, {
      email: mockUser.email,
      password: mockUser.password
    })

    await deleteSelf(app, responseVerifyBody.data.jwtToken)
  })

  //other:

  it('should get another user', async () => {
    const controlFunc = userControl(app, mockUser)
    await controlFunc(getAnotherF)
  })

  it('should get other users', async () => {
    const controlFunc = usersControl(app, mockUser)
    await controlFunc(getOtherF)
  })

  it('should delete other user', async () => {
    const data = await fullSignUp(app, {
      email: mockUser.email,
      password: mockUser.password
    })
    const reqWithAdminPermission = await requestWithAdminPermission(app, data.responseBody.person, mockUser)
    await reqWithAdminPermission(deleteAnotherF)
  })

  //education:

  it('should test CRUD education', async () => {
    const controlFunc = userControl(app, mockUser)
    await controlFunc(educationCRUD)
  })

  it('should test ERRORS education', async () => {
    const controlFunc = userControl(app, mockUser)
    await controlFunc(educationERRORS)
  })
  
  //avatar:

  it('should test avatar', async () => {
    const controlFunc = userControl(app, mockUser)
    await controlFunc(avatarF)
  })

  //professional_interests: 
  
  it('should test CRUD professional_interests', async () => {
    const controlFunc = userControl(app, mockUser)
    await controlFunc(professionalInterestF)
  })

  //awards 

  it('should test CRUD awards', async () => {
    const controlFunc = userControl(app, mockUser)
    await controlFunc(awardsF)
  })

  // content-item

  it('should test content-item ok response', async () => {
    const reqWithAdminPermission = await requestWithAdminPermission(app, null, mockUser)
    await reqWithAdminPermission(contentItemF)
  })

  //tag

  it('should test tag ok response', async () => {
    const reqWithAdminPermission = await requestWithAdminPermission(app, null, mockUser)
    await reqWithAdminPermission(tagF)

  })

  it('should return latest tags', async () => {
    await clearUser(app, mockUser)
    const reqWithAdminPermission = await requestWithAdminPermission(app, null, mockUser)
    await reqWithAdminPermission(clearCategory)
    await reqWithAdminPermission(clearContentItem)
    
    await reqWithAdminPermission(tagPracticeCI_F)
    
    await reqWithAdminPermission(clearCategory)
    await reqWithAdminPermission(clearContentItem)
  })

  it('should find user by name|surname|middle name', async () => {
    const controlFunc = userControl(app, mockUser)
    await controlFunc(professionalInterestF)
  })
  
  
  //user-category

  it('should test user-category', async () => {
    await clearUser(app, mockUser)
    const reqWithAdminPermission = requestWithAdminPermission(app, null, mockUser)
    await reqWithAdminPermission(clearCategory)
    await reqWithAdminPermission(clearContentItem)
    
    await reqWithAdminPermission(userCategoryF)
    
    await reqWithAdminPermission(clearCategory)
    await reqWithAdminPermission(clearContentItem)
  })

  //

  afterAll(async () => {
    await clearUser(app, mockUser)
    const reqWithAdminPermission = requestWithAdminPermission(app, null, mockUser)
    await reqWithAdminPermission(clearCategory)
    await reqWithAdminPermission(clearContentItem)
    
    return await app.close()
  })

});