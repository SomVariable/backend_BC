import { HttpAdapterHost } from '@nestjs/core';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DatabaseModule } from 'src/api/database/database.module';
import {
  fullSignUp,
  requestWithAdminPermission,
  userControl,
  usersControl,
} from './helpers/auth.helper';

import {
  deleteAnotherF,
  deleteSelf,
  getAnotherF,
  getOtherF,
  getSelfF,
  updateSelfF,
} from './helpers/user.helper';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import {
  contentItemF,
  tagF,
  tagPracticeCI_F,
} from './helpers/content-item.helper';
import { educationCRUD, educationERRORS } from './helpers/education.helper';
import { avatarF } from './helpers/image.helper';
import { professionalInterestF } from './helpers/pi.helper';
import { awardsF } from './helpers/award.helper';
import { userCategoryF } from './helpers/user-category.helper';
import { userProfileF } from './helpers/user-profile-info.helper';
import { UniqueNumberGenerator } from './helpers/generateUniqueNumber.helper';
import { fullClean } from './helpers/full-clean.helper';

const mockUser = {
  email: `u@gmail.com`,
  password: '123QWE_qwe!@#13',
  accessToken: '',
  refreshToken: '',
};

describe('User (e2e)', () => {
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
    await app.listen(3000 + Math.floor(Math.random() * 10 + 1));
    await fullClean(app);
    // const reqWithAdminPermission = requestWithAdminPermission(app, null, mockUser)
    // await reqWithAdminPermission(clearCategory)
    // await reqWithAdminPermission(clearContentItem)
  });

  // // self
  it('should return account data', async () => {
    const controlFunc = userControl(app, mockUser);
    await controlFunc(getSelfF);
  });

  it('should update account', async () => {
    const controlFunc = userControl(app, mockUser);
    await controlFunc(updateSelfF);
  });

  it('should delete account', async () => {
    const { responseVerifyBody } = await fullSignUp(app, {
      email: `ac${UniqueNumberGenerator.generateRandomNumber()}@gmail.com`,
      password: mockUser.password,
    });

    await deleteSelf(app, responseVerifyBody.data.jwtToken);
  });

  //other:

  it('should get another user', async () => {
    const controlFunc = userControl(app, mockUser);
    await controlFunc(getAnotherF);
  });

  it('should get other users', async () => {
    const controlFunc = usersControl(app, mockUser);
    await controlFunc(getOtherF);
  });

  it('should delete other user', async () => {
    const data = await fullSignUp(app, {
      email: `oth${UniqueNumberGenerator.generateRandomNumber()}@gmail.com`,
      password: mockUser.password,
    });
    const reqWithAdminPermission = await requestWithAdminPermission(
      app,
      data.responseBody.person,
      data.dto,
    );
    await reqWithAdminPermission(deleteAnotherF);
  });

  //education:

  it('should test CRUD education', async () => {
    const controlFunc = userControl(app, mockUser);
    await controlFunc(educationCRUD);
  });

  it('should test ERRORS education', async () => {
    const controlFunc = userControl(app, mockUser);
    await controlFunc(educationERRORS);
  });

  //avatar:

  it('should test avatar', async () => {
    const controlFunc = userControl(app, mockUser);
    await controlFunc(avatarF);
  });

  //professional_interests:

  it('should test CRUD professional_interests', async () => {
    const controlFunc = userControl(app, mockUser);
    await controlFunc(professionalInterestF);
  });

  //awards

  it('should test CRUD awards', async () => {
    const controlFunc = userControl(app, mockUser);
    await controlFunc(awardsF);
  });

  // content-item

  it('should test content-item ok response', async () => {
    const reqWithAdminPermission = await requestWithAdminPermission(
      app,
      null,
      mockUser,
    );
    await reqWithAdminPermission(contentItemF);
  });

  //tag

  it('should test tag ok response', async () => {
    const reqWithAdminPermission = await requestWithAdminPermission(
      app,
      null,
      mockUser,
    );
    await reqWithAdminPermission(tagF);
  });

  it('should return latest tags', async () => {
    const reqWithAdminPermission = await requestWithAdminPermission(
      app,
      null,
      mockUser,
    );

    await reqWithAdminPermission(tagPracticeCI_F);
  });

  it('should find user by name|surname|middle name', async () => {
    const controlFunc = userControl(app, mockUser);
    await controlFunc(professionalInterestF);
  });

  //user-category

  it('should test user-category', async () => {
    const reqWithAdminPermission = requestWithAdminPermission(
      app,
      null,
      mockUser,
    );
    await reqWithAdminPermission(userCategoryF);
  });

  // user-profile
  it('should test user-profile', async () => {
    const controlFunc = userControl(app, mockUser);
    await controlFunc(userProfileF);
  });

  afterAll(async () => {
    //await fullClean(app)
    // const reqWithAdminPermission = requestWithAdminPermission(app, null, mockUser)
    // await reqWithAdminPermission(clearCategory)
    // await reqWithAdminPermission(clearContentItem)

    return await app.close();
  });
});
