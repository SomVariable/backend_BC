import { HttpAdapterHost } from '@nestjs/core';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DatabaseModule } from 'src/api/database/database.module';
import { validate } from 'class-validator';
import { SignInDto } from 'src/api/auth/dto/sign-in.dto';
import {
  fullLogin,
  fullLogout,
  fullReset,
  fullSignUp,
  requestWithAdminPermission,
  resetPasswordByAdmin401,
  resetPasswordByAdmin404,
  resetPasswordByAdminF,
  resetPasswordForbidden,
  signIn404,
  signUpAdmin,
  userControl,
  usersControl,
} from './helpers/auth.helper';
import {
  activeSession,
  blockSession,
  deleteSession,
  getSession,
} from './helpers/kv-store.helper';
import {
  deleteAnotherF,
  deleteSelf,
  getAnotherF,
  getOtherF,
  getSelfBadRequest,
  getSelfF,
  updateSelfF,
} from './helpers/user.helper';
import { CreateUserDto } from 'src/api/auth/dto/create-person.dto';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { STRONG_PASSWORD } from './constants/test.constants';
import { fullClean } from './helpers/full-clean.helper';
import { UniqueNumberGenerator } from './helpers/generateUniqueNumber.helper';
import { educationCRUD, educationERRORS } from './helpers/education.helper';
import { avatarF } from './helpers/image.helper';
import { professionalInterestF } from './helpers/pi.helper';
import { awardsF } from './helpers/award.helper';
import {
  contentItemF,
  tagF,
  tagPracticeCI_F,
} from './helpers/content-item.helper';
import { userCategoryF } from './helpers/user-category.helper';
import { userProfileF } from './helpers/user-profile-info.helper';
import { areaCRUD, practiceCRUD, serviceCRUD } from './helpers/category.helper';
import { filterUsersByNameF } from './helpers/filters.helper';

const mockUser = {
  email: `a@gmail.com`,
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
    await app.listen(3000 + Math.floor(Math.random() * 10 + 12));

    await fullClean(app);
  });

  it('should sign up new user, and verify it', async () => {
    const { responseBody, responseVerifyBody } = await fullSignUp(app, {
      email: 'shsiupnewusan@gmail.com',
      password: mockUser.password,
    });

    await deleteSelf(app, responseVerifyBody.data.jwtToken);
    await deleteSession(app, responseBody.person.id);
  });

  it('should sign up admin', async () => {
    const adminData: CreateUserDto = {
      email: 'admin@gmail.com',
      password: STRONG_PASSWORD,
    };
    const { responseBody } = await signUpAdmin(app, adminData);

    await deleteSelf(app, responseBody.jwtToken);
    await deleteSession(app, responseBody.user.id);
  });

  it('should reset data: jwt, verify', async () => {
    const controlFunc = userControl(app, mockUser);
    await controlFunc(fullReset);
  });

  it('should logout user', async () => {
    const controlFunc = userControl(app, mockUser);
    await controlFunc(fullLogout);
  });

  it('should login user', async () => {
    const controlFunc = userControl(app, mockUser);
    await controlFunc(fullLogin);
  });

  it('should block request because of block session ', async () => {
    const { responseBody, responseVerifyBody } = await fullSignUp(app, {
      email: 'sbrblockbs@gmail.com',
      password: mockUser.password,
    });

    let responseKvStoreBody = await getSession(app, responseBody.person.id);

    if (responseKvStoreBody.data.status !== 'BLOCKED') {
      responseKvStoreBody = await blockSession(app, responseBody.person.id);
    }

    await getSelfBadRequest(app, responseVerifyBody.data.jwtToken);
    await activeSession(app, responseBody.person.id);
    await deleteSelf(app, responseVerifyBody.data.jwtToken);
    await deleteSession(app, responseBody.person.id);
  });

  it('should check user creation with wrong data', async () => {
    const mockUser = {
      email: 'valid_email_51',
      password: 'week_password',
      accessToken: '',
      refreshToken: '',
    };

    const dto_fake = new CreateUserDto();
    dto_fake.email = mockUser.email;
    dto_fake.password = mockUser.password;

    const validationErrors = await validate(dto_fake);

    expect(validationErrors).toHaveLength(2);
  });

  it('should check login with non-existent user at login', async () => {
    const dto = new SignInDto();
    dto.email = 'i_don`t_exist@gmail.com';
    dto.password = mockUser.password;

    const validationErrors = await validate(dto);

    expect(validationErrors).toHaveLength(0);

    await signIn404(app, dto);
  });

  it('should test reset password by admin. ok res', async () => {
    const reqWithAdminPermission = requestWithAdminPermission(
      app,
      null,
      mockUser,
    );
    await reqWithAdminPermission(resetPasswordByAdminF);
  });

  it('should test reset password by admin. 403 res', async () => {
    const controlFunc = await userControl(app, mockUser);
    await controlFunc(resetPasswordForbidden);
  });

  it('should test reset password by admin. 404 res', async () => {
    const reqWithAdminPermission = await requestWithAdminPermission(
      app,
      null,
      mockUser,
    );
    await reqWithAdminPermission(resetPasswordByAdmin404);
  });

  it('should test reset password by admin. 401 res', async () => {
    await resetPasswordByAdmin401(app);
  });

  //user

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

  //category

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

  it('should test user filter', async () => {
    const reqWithAdminPermission = requestWithAdminPermission(
      app,
      null,
      mockUser,
    );
    await reqWithAdminPermission(filterUsersByNameF);
  })

  it('', () => {
    console.log(true)
  })
  afterAll(async () => {
    await fullClean(app);
    return await app.close();
  });
});
