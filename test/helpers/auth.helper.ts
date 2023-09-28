import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateUserDto } from 'src/api/auth/dto/create-person.dto';
import { validate } from 'class-validator';
import { AUTH_OK } from 'src/api/auth/constants/auth.constants';
import { SignInDto } from 'src/api/auth/dto/sign-in.dto';
import { Session } from 'src/api/kv-store/kv-types/kv-store.type';
import { deleteSession, getSession } from './kv-store.helper';
import { deleteUser } from './user.helper';
import { ResendVerifyKey } from 'src/api/auth/dto/resend-verify-key.dto';

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
      .send({email})
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

export const userVerify = async (app, email: string,  session: Session) => {
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


export const userControl = (app, mockUser) => {
  return async (func: (app, data, mockUser) => void) => {
    const data = await fullSignUp(app, {
      email: mockUser.email,
      password: mockUser.password
    })

    await func(app, data, mockUser)
  
    await deleteUser(app, data.responseBody.person.id)
    await deleteSession(app, data.responseBody.person.id)
  
  }
}

export const fullSignUp = async (app, mockUser: CreateUserDto) => {
  const dto = new CreateUserDto();
    dto.email = mockUser.email;
    dto.password = mockUser.password;

    const validationErrors = await validate(dto);

    expect(validationErrors).toHaveLength(0);
    
    const responseBody = await createUserTest(app, dto)
    const sessionRes = await getSession(app, responseBody.person.id)
    const responseVerifyBody = await verifyUserSignUp(app, dto.email, sessionRes.data)

    return {responseVerifyBody, sessionRes, responseBody, dto}
}

export const fullLogin = async (app, {responseVerifyBody}, mockUser) => {
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

export const fullLogout = async (app, {responseVerifyBody}, mockUser) => {
  await logoutUser(app, responseVerifyBody.data.jwtToken)
}

export const fullReset = async (app, {responseBody, responseVerifyBody}, mockUser) => {
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