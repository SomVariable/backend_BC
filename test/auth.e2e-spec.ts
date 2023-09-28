
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DatabaseModule } from 'src/api/database/database.module';
import { validate } from 'class-validator';
import { SignInDto } from 'src/api/auth/dto/sign-in.dto';
import { ResendVerifyKey } from 'src/api/auth/dto/resend-verify-key.dto';
import {  fullLogin, fullLogout, fullReset, fullSignUp, logoutUser, refreshToken, resendVerify, signIn,  signIn404,  userControl,  verifyUserSignIn } from './helpers/auth.helper';
import {  activeSession, blockSession, deleteSession, getSession } from './helpers/kv-store.helper';
import { clearUser, deleteUser, getSelfBadRequest, getUserByEmail } from './helpers/user.helper';
import { CreateUserDto } from 'src/api/auth/dto/create-person.dto';


const mockUser = {
  email: `e2e_auth_test_33@gmail.com`,
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

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  
  it('should sign up new user, and verify it', async () => {
    const {responseBody} = await fullSignUp(app, {
      email: mockUser.email,
      password: mockUser.password
    })


    await deleteUser(app, responseBody.person.id)
    await deleteSession(app, responseBody.person.id)
    
  });

  it('should reset data: jwt, verify', async () => {
    const controlFunc = userControl(app, mockUser)
    await controlFunc(fullReset) 
  })
  
  it('should logout user', async () => {
    const controlFunc = userControl(app, mockUser)
    await controlFunc(fullLogout)    
  })

  it('should login user', async () => {
    const controlFunc = userControl(app, mockUser)
    await controlFunc(fullLogin)
  })

  it('should block request because of block session ', async () => {
    const {responseBody, responseVerifyBody} = await fullSignUp(app, {
      email: mockUser.email,
      password: mockUser.password
    })
    
    let responseKvStoreBody = await getSession(app, responseBody.person.id);
    
    if( responseKvStoreBody.data.status !== 'BLOCKED' ) {
        responseKvStoreBody = await blockSession(app, responseBody.person.id)
    }

    await getSelfBadRequest(app, responseVerifyBody.data.jwtToken) 
    await activeSession(app, responseBody.person.id)
    await deleteUser(app, responseBody.person.id)
    await deleteSession(app, responseBody.person.id)

  })

  it('should check user creation with wrong data', async () => {
    const mockUser = {
      email: 'valid_email_51',
      password: 'week_password', 
      accessToken: '',
      refreshToken: ''
    }
    
    const dto_fake = new CreateUserDto();
    dto_fake.email = mockUser.email; 
    dto_fake.password = mockUser.password;  

    const validationErrors = await validate(dto_fake);

    expect(validationErrors).toHaveLength(2);
  })

  it('should check login with non-existent user at login', async () => {
    const dto = new SignInDto();
    dto.email = "i_don\`t_exist@gmail.com"; 
    dto.password = mockUser.password;  

    const validationErrors = await validate(dto);

    expect(validationErrors).toHaveLength(0);

    await signIn404(app, dto)
  })

  afterAll(async () => {
    await clearUser(app, mockUser)
    return await app.close()
  })

});