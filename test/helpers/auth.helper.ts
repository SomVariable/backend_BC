import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateUserDto } from 'src/api/auth/dto/create-person.dto';
import { validate } from 'class-validator';
import { AUTH_OK } from 'src/api/auth/constants/auth.constants';
import { SignInDto } from 'src/api/auth/dto/sign-in.dto';
import { Session } from 'src/api/kv-store/kv-types/kv-store.type';
import { deleteSession, getSession } from './kv-store.helper';
import { ResendVerifyKey } from 'src/api/auth/dto/resend-verify-key.dto';
import { deleteSelf } from './user.helper';
import { STRONG_PASSWORD } from 'test/constants/test.constants';
import { VerificationOkResponse } from 'src/api/auth/dto/ok-response/verification.dto';
import { Role } from '@prisma/client';
import { FirstUserOkResponse } from 'src/api/auth/dto/ok-response/first-user.dto';
import { fullSignUpType, signUpAdminType } from 'test/types/test.types';
import { SignUpOkResponse } from 'src/api/auth/dto/ok-response/sign-up.dto';

export const createUserTest = async (
  app: INestApplication,
  dto: { email: string, password: string }) => {
  const responseSignUp = await request(app.getHttpServer())
    .post('/auth/sign-up')
    .set('User-Agent', 'Mobile')
    .send(dto)
    .expect(201);

  const responseBody = await JSON.parse(responseSignUp.text);
  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('person');
  expect(responseBody.person).toHaveProperty('id');
  expect(responseBody.person).toHaveProperty('email');
  expect(responseBody.person).toHaveProperty('accountStatus');
  expect(responseBody.person).toHaveProperty('role');

  return responseBody
}

export const createAdminTest = async (
  app: INestApplication,
  dto: { email: string, password: string }
  ) : Promise<FirstUserOkResponse>=> {
  const responseSignUp = await request(app.getHttpServer())
    .post('/auth/first-user')
    .set('User-Agent', 'Mobile')
    .send(dto)
    .expect(201);

  const responseBody = await JSON.parse(responseSignUp.text);
  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('user');
  expect(responseBody).toHaveProperty('jwtToken');
  expect(responseBody).toHaveProperty('refreshToken');
  expect(responseBody.user).toHaveProperty('id');
  expect(responseBody.user).toHaveProperty('email');
  expect(responseBody.user).toHaveProperty('accountStatus');
  expect(responseBody.user).toHaveProperty('role', Role.ADMIN);

  return responseBody
}

export const verifyUserSignUp = async (app, email: string, session) => {
  const responseVerify = await request(app.getHttpServer())
    .patch('/auth/sign-up/verification')
    .set('User-Agent', 'Mobile')
    .send({
      email: email,
      verifyCode: session.verificationKey
    })
    .expect(200);

  const responseVerifyBody = await JSON.parse(responseVerify.text);

  expect(responseVerifyBody).toHaveProperty('message');
  expect(responseVerifyBody).toHaveProperty('data');
  expect(responseVerifyBody.data).toHaveProperty('jwtToken');
  expect(responseVerifyBody.data).toHaveProperty('refreshToken');

  return responseVerifyBody
}

export const verifyUserSignIn = async (app, email: string, session) => {
  const responseVerify = await request(app.getHttpServer())
    .patch('/auth/login/verification')
    .set('User-Agent', 'Mobile')
    .send({
      email: email,
      verifyCode: session.verificationKey
    })
    .expect(200);

  const responseVerifyBody = await JSON.parse(responseVerify.text);

  expect(responseVerifyBody).toHaveProperty('message');
  expect(responseVerifyBody).toHaveProperty('data');
  expect(responseVerifyBody.data).toHaveProperty('jwtToken');
  expect(responseVerifyBody.data).toHaveProperty('refreshToken');

  return responseVerifyBody
}

export const resendVerify = async (app, email: string) => {
  const responseResendVerify = await request(app.getHttpServer())
    .patch('/auth/resend-verify-key')
    .set('User-Agent', 'Mobile')
    .send({ email })
    .expect(200);

  const responseResendVerifyBody = await JSON.parse(responseResendVerify.text);

  expect(responseResendVerifyBody).toHaveProperty('message', AUTH_OK.SEND_VERIFICATION_KEY);

  return responseResendVerifyBody
}

export const refreshToken = async (app, refreshToken: string) => {
  const refreshTokenResponse = await request(app.getHttpServer())
    .get(`/auth/refresh-token`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${refreshToken}`)
    .expect(200);
  const refreshTokenResponseBody = await JSON.parse(refreshTokenResponse.text);

  expect(refreshTokenResponseBody).toHaveProperty('message');
  expect(refreshTokenResponseBody).toHaveProperty('data');
  expect(refreshTokenResponseBody.data).toHaveProperty('jwtToken');
  expect(refreshTokenResponseBody.data).toHaveProperty('refreshToken');
}

export const logoutUser = async (app, accessToken: string) => {
  const responseLogout = await request(app.getHttpServer())
    .patch('/auth/logout')
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(200);

  const responseBody = await JSON.parse(responseLogout.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('status', 'BLOCKED');

  return responseLogout
}

export const signIn = async (app, dto: SignInDto) => {
  const responseSignIn = await request(app.getHttpServer())
    .post('/auth/sign-in')
    .set('User-Agent', 'Mobile')
    .send(dto)
    .expect(201);

  const responseBody = await JSON.parse(responseSignIn.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('person');
  expect(responseBody.person).toHaveProperty('id');
  expect(responseBody.person).toHaveProperty('email')
  expect(responseBody.person).toHaveProperty('role')
  expect(responseBody.person).toHaveProperty('accountStatus')

  return responseBody
}

export const signIn404 = async (app, dto: SignInDto) => {
  await request(app.getHttpServer())
    .post('/auth/sign-in')
    .set('User-Agent', 'Mobile')
    .send(dto)
    .expect(404);
}

export const userVerify = async (app, email: string, session: Session) => {
  const responseVerify = await request(app.getHttpServer())
    .patch('/auth/sign-up/verification')
    .set('User-Agent', 'Mobile')
    .send({
      email,
      verifyCode: session.verificationKey
    })
    .expect(200);

  const responseVerifyBody = await JSON.parse(responseVerify.text);

  expect(responseVerifyBody).toHaveProperty('message');
  expect(responseVerifyBody).toHaveProperty('data');
  expect(responseVerifyBody.data).toHaveProperty('jwtToken');
  expect(responseVerifyBody.data).toHaveProperty('refreshToken');

  return responseVerifyBody
}


export const userControl = (app, mockUser, _?: any) => {
  return async (func: (app, data, mockUser, _?) => void) => {
    const data: fullSignUpType = await fullSignUp(app, {
      email: mockUser.email,
      password: mockUser.password
    })

    const { responseBody, responseVerifyBody } = data

    await func(app, data, mockUser, _)

    await deleteSelf(app, responseVerifyBody.data.jwtToken)
    await deleteSession(app, responseBody.person.id)
  }
}

export const requestWithAdminPermission = (app, data, mockUser: CreateUserDto) => {
  return async (func) => {
    const adminData: CreateUserDto = {
      email: `a${Math.floor(Math.random() * 4000000)}@gmail.com`,
      password: STRONG_PASSWORD
    }
    const reqAdminData = await signUpAdmin(app, adminData)

    func(app, data, mockUser, reqAdminData)

    await deleteSelf(app, reqAdminData.responseBody.jwtToken)
    await deleteSession(app, reqAdminData.responseBody.user.id)
  }
}

export const usersControl = (
  app,
  mockUser: { email: string, password: string },
  length: number = 5) => {
  let mockUsers = []

  for (let userId = 0; userId <= length; userId++) {
    mockUsers = [...mockUsers, {
      ...mockUser,
      email: `${mockUser.email.replace('@gmail.com', '')}_${userId}@gmail.com`
    }]
  }

  return async (func: (app, data, mockUser) => void) => {
    const createPromises = mockUsers.map(async (user) => {
      return await fullSignUp(app, {
        email: user.email,
        password: user.password
      });
    });

    const data = await Promise.all(createPromises)

    await func(app, data, mockUsers)

    Promise.all([...data].map(async (_) => {
      return deleteSelf(app, _.responseVerifyBody.data.jwtToken)
    })
    )

    Promise.all([...data].map(async (_) => {
      return deleteSession(app, _.responseBody.person.id)
    })
    )
  }
}

export const fullSignUp = async (app, mockUser: CreateUserDto) => {
  const dto = new CreateUserDto();
  dto.email = mockUser.email;
  dto.password = mockUser.password;

  const validationErrors = await validate(dto);

  expect(validationErrors).toHaveLength(0);

  const responseBody: SignUpOkResponse = await createUserTest(app, dto)
  const sessionRes = await getSession(app, responseBody.person.id)
  const responseVerifyBody: VerificationOkResponse = await verifyUserSignUp(app, dto.email, sessionRes.data)

  return { responseVerifyBody, sessionRes, responseBody, dto }
}

export const fullLogin = async (app, { responseVerifyBody }, mockUser) => {
  await logoutUser(app, responseVerifyBody.data.jwtToken)

  const dto = new SignInDto();
  dto.email = mockUser.email;
  dto.password = mockUser.password;

  const validationErrors = await validate(dto);

  expect(validationErrors).toHaveLength(0);


  const responseBodySignIn = await signIn(app, dto)
  const responseKvStoreBody = await getSession(app, responseBodySignIn.person.id);
  expect(responseKvStoreBody.data).toHaveProperty('status', 'BLOCKED')

  await verifyUserSignIn(app, dto.email, responseKvStoreBody.data)

  const responseKvStoreWithActiveBody = await getSession(app, responseBodySignIn.person.id);

  expect(responseKvStoreWithActiveBody.data).toHaveProperty('status', 'ACTIVE');

}



export const signUpAdmin = async (app, mockUser): Promise<signUpAdminType> => {
  const dto = new CreateUserDto();
  dto.email = mockUser.email;
  dto.password = mockUser.password;

  const validationErrors = await validate(dto);

  expect(validationErrors).toHaveLength(0);

  const responseBody = await createAdminTest(app, dto)
  const sessionRes = await getSession(app, responseBody.user.id)

  return { sessionRes, responseBody, dto }
}


export const fullLogout = async (app, { responseBody, responseVerifyBody }, mockUser) => {
  await logoutUser(app, responseVerifyBody.data.jwtToken)
  const responseBodySignIn = await signIn(app, mockUser)
  const responseKvStoreBody = await getSession(app, responseBodySignIn.person.id);
  expect(responseKvStoreBody.data).toHaveProperty('status', 'BLOCKED')

  await verifyUserSignIn(app, mockUser.email, responseKvStoreBody.data)

  const responseKvStoreWithActiveBody = await getSession(app, responseBodySignIn.person.id);

  expect(responseKvStoreWithActiveBody.data).toHaveProperty('status', 'ACTIVE');
}

export const fullReset = async (app, { responseBody, responseVerifyBody }, mockUser) => {
  const dto = new ResendVerifyKey();
  dto.email = responseBody.person.email;

  const validationErrors = await validate(dto);

  expect(validationErrors).toHaveLength(0);

  const responseKvStoreBody = await getSession(app, responseBody.person.id)

  await resendVerify(app, dto.email);

  const responseKvStoreWithUpdateVerifyBody = await getSession(app, responseBody.person.id)

  expect(responseKvStoreWithUpdateVerifyBody.data.verificationKey)
    .not.toEqual(responseKvStoreBody.data.verificationKey);

  await refreshToken(app, responseVerifyBody.data.refreshToken);
}