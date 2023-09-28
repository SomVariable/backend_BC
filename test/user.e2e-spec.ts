
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
import { UNIQUE_MESSAGE } from 'src/common/constants/app.constants';
import { createUserTest, fullSignUp, logoutUser, refreshToken, resendVerify, signIn, signIn404, userVerify } from './helpers/auth.helper';
import { activeSession, blockSession, getSession } from './helpers/kv-store.helper';
import { verifyUserSignUp } from './helpers/auth.helper';
import { clearUser, deleteSelf, getSelf, getSelfBadRequest, getUserByEmail, updateSelf } from './helpers/user.helper';
import { UpdateUserDto } from 'src/api/user/dto/update-user.dto';


const mockUser = {
  email: `e2e_user_test_9@gmail.com`,
  password: '123QWE_qwe!@#13', 
  accessToken: '',
  refreshToken: ''
}

describe('User (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  

  // self
  it('should return account data', async () => {
    const {responseVerifyBody} = await fullSignUp(app, {
        email: mockUser.email,
        password: mockUser.password
      })
  
      await getSelf(app, responseVerifyBody.data.jwtToken)

      await deleteSelf(app, responseVerifyBody.data.jwtToken)

      return true
  })

  it('should update account', async () => {
    const updateData: UpdateUserDto = {
        email: "new_e2eTest@gmail.com",
        password: '321_QWE_qwe_!@#' 
    }
    const {responseVerifyBody} = await fullSignUp(app, {
        email: mockUser.email,
        password: mockUser.password
      })
    
    await updateSelf(app, responseVerifyBody.data.jwtToken, updateData)
    
    const self = await getSelf(app, responseVerifyBody.data.jwtToken)

    await deleteSelf(app, responseVerifyBody.data.jwtToken)

    return true
  })

  it('should delete account', async () => {
    const {responseVerifyBody} = await fullSignUp(app, {
        email: mockUser.email,
        password: mockUser.password
      })
    
      
    await deleteSelf(app, responseVerifyBody.data.jwtToken)

    return true
  })

  afterAll(async () => {
    await clearUser(app, mockUser)

    return await app.close()
  })

});