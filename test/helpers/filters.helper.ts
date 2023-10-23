import * as request from 'supertest';
import { CreateUserDto } from "src/api/auth/dto/create-person.dto";
import { fullSignUpType, signUpAdminType } from "test/types/test.types";
import { GetUsersByNameOkResponse } from 'src/api/user/dto/ok-response/get-users-by-name.dto';
import { fullSignUp } from './auth.helper';
import { createUserProfile } from './user-profile-info.helper';
import { CreateUserProfileDto } from 'src/api/user-profile/dto/create-user-profile.dto';
import { STRONG_PASSWORD } from 'test/constants/test.constants';
import { LANGS } from 'src/common/dto/translation-param.dto';
import { UserTranslationOkResponse } from 'src/api/user-profile/dto/ok-response/ok.dto';
import { deleteUser, getUserByEmail } from './user.helper';
import { GetUserProfileByNameDto } from 'src/api/user/dto/get-user-by-name.dto';

export const filterUsersByName = async (
  app,
  jwt: string,
  name: string,
  expectCount: number,
) => {
  const sendObj: GetUserProfileByNameDto = {
    name
  }
  const response = await request(app.getHttpServer())
    .get(`/users/by/name`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwt}`)
    .query(sendObj)
    .expect(200);

  const responseBody: GetUsersByNameOkResponse = await JSON.parse(response.text);
  expect(responseBody).toHaveProperty('data');
  expect(responseBody).toHaveProperty('limit');
  expect(responseBody).toHaveProperty('offset');
  expect(responseBody.data.length).toBe(expectCount);

};

export const filterUsersByNameF = async (
  app,
  data,
  mockUser: CreateUserDto,
  reqAdminData: signUpAdminType,
) => {
  const { responseBody } = reqAdminData
  const adminJwt = responseBody.jwtToken
  const usersData: { email: string, profileDto: CreateUserProfileDto }[] = [
    { email: "userFilter_1@gmail.com", profileDto: { firstName: 'f_Gwyn', surnameName: 'Some' } },
    { email: "userFilter_2@gmail.com", profileDto: { firstName: 'f_Gwynevere', surnameName: 'Surname' } },
    { email: "userFilter_3@gmail.com", profileDto: { firstName: 'f_Gwyndolin' } },
    { email: "userFilter_4@gmail.com", profileDto: { firstName: 'f_Gleb' } },
    { email: "userFilter_5@gmail.com", profileDto: { firstName: 'Variable' } },
  ]

  const userAccountsPromise = [...usersData].map(async user => {
    const newUserAccountRes: fullSignUpType = await fullSignUp(app, {
      email: user.email,
      password: STRONG_PASSWORD
    })

    return newUserAccountRes
  })
  const userAccountsRes = await Promise.all(userAccountsPromise);
  const userProfilesPromise = [...usersData].map(async (user, id) => {
    const newUserProfileRes = await createUserProfile(
      app,
      user.profileDto,
      {
        langCode: LANGS.EN
      },
      userAccountsRes[id].responseVerifyBody.data.jwtToken
    )
    return newUserProfileRes
  })
  await Promise.all(userProfilesPromise);

  await filterUsersByName(app, adminJwt, "f", 4)
  await filterUsersByName(app, adminJwt, "f_G", 4)
  await filterUsersByName(app, adminJwt, "f_Gwyn", 3)
  await filterUsersByName(app, adminJwt, "f_Gwynevere", 1)
  await filterUsersByName(app, adminJwt, "f_Gwyndolin", 1)
  await filterUsersByName(app, adminJwt, "S", 2)
  await filterUsersByName(app, adminJwt, "Some", 1)
}