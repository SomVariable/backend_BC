
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DatabaseModule } from 'src/api/database/database.module';
import { CreateUserDto } from 'src/api/auth/dto/create-person.dto';
import { validate } from 'class-validator';
import { SignInDto } from 'src/api/auth/dto/sign-in.dto';
import { ResendVerifyKey } from 'src/api/auth/dto/resend-verify-key.dto';
import { AUTH_OK } from 'src/api/auth/constants/auth.constants';

const mockUser = {
  email: 'valid_email_50@gmail.com',
  password: '123QWE_qwe!@#13', 
  accessToken: '',
  refreshToken: ''
}

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should sign up new user, and verify it', async () => {
    const dto = new CreateUserDto();
    dto.email = mockUser.email; 
    dto.password = mockUser.password;  

    const validationErrors = await validate(dto);

    expect(validationErrors).toHaveLength(0);

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

    const responseKvStore = await request(app.getHttpServer())
    .get(`/kv-store/session/${responseBody.person.id}`)
    .set('User-Agent', 'Mobile')
    .expect(200); 
    const responseKvStoreBody = await JSON.parse(responseKvStore.text);
    
    expect(responseKvStoreBody).toHaveProperty('message');
    expect(responseKvStoreBody).toHaveProperty('data');
    expect(responseKvStoreBody.data).toHaveProperty('id');
    expect(responseKvStoreBody.data).toHaveProperty('status');
    expect(responseKvStoreBody.data).toHaveProperty('verificationKey');
    expect(responseKvStoreBody.data).toHaveProperty('verificationTimestamp');

    const responseVerify = await request(app.getHttpServer())
      .patch('/auth/sign-up/verification')
      .set('User-Agent', 'Mobile')
      .send({
        email: dto.email, 
        verifyCode: responseKvStoreBody.data.verificationKey
      })
      .expect(200);

    const responseVerifyBody = await JSON.parse(responseVerify.text);

    expect(responseVerifyBody).toHaveProperty('message');
    expect(responseVerifyBody).toHaveProperty('data');
    expect(responseVerifyBody.data).toHaveProperty('jwtToken');
    expect(responseVerifyBody.data).toHaveProperty('refreshToken');

    mockUser.accessToken = responseVerifyBody.data.jwtToken
    mockUser.refreshToken = responseVerifyBody.data.refreshToken

    return true
  });

  it('should reset data: jwt, verify', async () => {
    const dto = new ResendVerifyKey();
    dto.email = mockUser.email; 

    const validationErrors = await validate(dto);

    expect(validationErrors).toHaveLength(0);

    const response = await request(app.getHttpServer())
    .get(`/users/user/byEmail/${dto.email}`)
    .set('User-Agent', 'Mobile')
    .expect(200); 
    
    const responseBody = await JSON.parse(response.text);
    
    expect(responseBody).toHaveProperty('message', );
    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('id');
    expect(responseBody.data).toHaveProperty('email', dto.email);

    const responseKvStore = await request(app.getHttpServer())
    .get(`/kv-store/session/${responseBody.data.id}`)
    .set('User-Agent', 'Mobile')
    .expect(200); 
    const responseKvStoreBody = await JSON.parse(responseKvStore.text);
    
    expect(responseKvStoreBody).toHaveProperty('message');
    expect(responseKvStoreBody).toHaveProperty('data');
    expect(responseKvStoreBody.data).toHaveProperty('id');
    expect(responseKvStoreBody.data).toHaveProperty('status', 'ACTIVE');
    expect(responseKvStoreBody.data).toHaveProperty('verificationKey');
    expect(responseKvStoreBody.data).toHaveProperty('verificationTimestamp');

    const responseResendVerify = await request(app.getHttpServer())
      .patch('/auth/resend-verify-key')
      .set('User-Agent', 'Mobile')
      .send(dto)
      .expect(200);
    
    const responseResendVerifyBody = await JSON.parse(responseResendVerify.text);
    
    expect(responseResendVerifyBody).toHaveProperty('message', AUTH_OK.SEND_VERIFICATION_KEY);
    
    const responseKvStoreWithUpdateVerify = await request(app.getHttpServer())
    .get(`/kv-store/session/${responseBody.data.id}`)
    .set('User-Agent', 'Mobile')
    .expect(200); 
    const responseKvStoreWithUpdateVerifyBody = await JSON.parse(responseKvStoreWithUpdateVerify.text);
    
    expect(responseKvStoreWithUpdateVerifyBody).toHaveProperty('message');
    expect(responseKvStoreWithUpdateVerifyBody).toHaveProperty('data');
    expect(responseKvStoreWithUpdateVerifyBody.data).toHaveProperty('verificationKey');
    expect(responseKvStoreWithUpdateVerifyBody.data.verificationKey)
    .not.toEqual(responseKvStoreBody.data.verificationKey);

    const refreshTokenResponse = await request(app.getHttpServer())
    .get(`/auth/refresh-token`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${mockUser.refreshToken}`)
    .expect(200); 
    const refreshTokenResponseBody = await JSON.parse(refreshTokenResponse.text);
    
    expect(refreshTokenResponseBody).toHaveProperty('message');
    expect(refreshTokenResponseBody).toHaveProperty('data');
    expect(refreshTokenResponseBody.data).toHaveProperty('jwtToken');
    expect(refreshTokenResponseBody.data).toHaveProperty('refreshToken');

    return true
  })
  
  it('should logout user', async () => {
    const responseLogout = await request(app.getHttpServer())
      .patch('/auth/logout')
      .set('User-Agent', 'Mobile')
      .set('Authorization', `Bearer ${mockUser.accessToken}`)
      .expect(200);
    
    const responseBody = await JSON.parse(responseLogout.text);

    expect(responseBody).toHaveProperty('message');
    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('id');
    expect(responseBody.data).toHaveProperty('status', 'BLOCKED');
  })

  it('should login user', async () => {
    const dto = new SignInDto();
    dto.email = mockUser.email; 
    dto.password = mockUser.password;  

    const validationErrors = await validate(dto);

    expect(validationErrors).toHaveLength(0);

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

    const responseKvStore = await request(app.getHttpServer())
    .get(`/kv-store/session/${responseBody.person.id}`)
    .set('User-Agent', 'Mobile')
    .expect(200); 
    const responseKvStoreBody = await JSON.parse(responseKvStore.text);
    
    expect(responseKvStoreBody).toHaveProperty('message');
    expect(responseKvStoreBody).toHaveProperty('data');
    expect(responseKvStoreBody.data).toHaveProperty('id');
    expect(responseKvStoreBody.data).toHaveProperty('status', 'BLOCKED');
    expect(responseKvStoreBody.data).toHaveProperty('verificationKey');
    expect(responseKvStoreBody.data).toHaveProperty('verificationTimestamp');

    const responseVerify = await request(app.getHttpServer())
      .patch('/auth/sign-up/verification')
      .set('User-Agent', 'Mobile')
      .send({
        email: dto.email, 
        verifyCode: responseKvStoreBody.data.verificationKey
      })
      .expect(200);

    const responseVerifyBody = await JSON.parse(responseVerify.text);

    expect(responseVerifyBody).toHaveProperty('message');
    expect(responseVerifyBody).toHaveProperty('data');
    expect(responseVerifyBody.data).toHaveProperty('jwtToken');
    expect(responseVerifyBody.data).toHaveProperty('refreshToken');

    mockUser.accessToken = responseVerifyBody.data.jwtToken
    mockUser.refreshToken = responseVerifyBody.data.refreshToken

    const responseKvStoreWithActive = await request(app.getHttpServer())
    .get(`/kv-store/session/${responseBody.person.id}`)
    .set('User-Agent', 'Mobile')
    .expect(200); 
    const responseKvStoreWithActiveBody = await JSON.parse(responseKvStoreWithActive.text);
    
    expect(responseKvStoreWithActiveBody.data).toHaveProperty('status', 'ACTIVE');
    return true
  })
  
  afterAll(async () => {

    const deleteUserResponse = await request(app.getHttpServer())
      .delete(`/user`)
      .set('Authorization', `Bearer ${mockUser.accessToken}`)
      .set('User-Agent', 'Mobile')
      .expect(200); 

      return await app.close()
  })

});