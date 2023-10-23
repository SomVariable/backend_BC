import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UpdateUserDto } from 'src/api/user/dto/update-user.dto';
import { deleteSession } from './kv-store.helper';
import { fullSignUpType, signUpAdminType } from 'test/types/test.types';
import { fullSignUp, requestWithAdminPermission } from './auth.helper';
import { GetUserProfileByNameDto } from 'src/api/user/dto/get-user-by-name.dto';
import { GetUsersByNameOkResponse } from 'src/api/user/dto/ok-response/get-users-by-name.dto';
import { CreateUserDto } from 'src/api/auth/dto/create-person.dto';
import { GetUserOkResponse } from 'src/api/user/dto/ok-response/get-user.dto';

export const dropUsers = async (
  app,
  data,
  mockUser,
  reqAdminData: signUpAdminType,
) => {
  await request(app.getHttpServer())
    .delete(`/users/user/drop`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${reqAdminData.responseBody.jwtToken}`)
    .expect(200);
};

export const clearUser = async (app, mockUser) => {
  const response = await request(app.getHttpServer())
    .get(`/users/user/byEmail/${mockUser.email}`)
    .set('User-Agent', 'Mobile');

  const data = await JSON.parse(response.text);
  if (data.data?.id) {
    const reqWithAdminPermission = requestWithAdminPermission(
      app,
      data.data,
      mockUser,
    );
    await reqWithAdminPermission(deleteAnotherF);

    return true;
  }

  return true;
};

export const clearContentItem = async (app, data, mockUser, reqAdminData) => {
  const token = `Bearer ${reqAdminData.responseBody.jwtToken}`;
  await request(app.getHttpServer())
    .delete(`/content-item`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', token);

  return true;
};

export const getSelf = async (app, jwt: string) => {
  const response = await request(app.getHttpServer())
    .get(`/user`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwt}`)
    .expect(200);

  const responseBody = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('email');

  return responseBody;
};

export const updateSelf = async (app, jwt, updateData: UpdateUserDto) => {
  const response = await request(app.getHttpServer())
    .patch(`/user`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwt}`)
    .send(updateData)
    .expect(200);

  const responseBody = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('email');

  return responseBody;
};

export const deleteSelf = async (app, accessToken: string) => {
  const deletedUser = await request(app.getHttpServer())
    .delete(`/user`)
    .set('Authorization', `Bearer ${accessToken}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  return deletedUser;
};

export const getSelfBadRequest = async (app, accessToken: string) => {
  return await request(app.getHttpServer())
    .get(`/user`)
    .set('Authorization', `Bearer ${accessToken}`)
    .set('User-Agent', 'Mobile')
    .expect(400);
};

// other
export const getUsers = async (app, users) => {
  try {
    const response = await request(app.getHttpServer())
      .get(`/users`)
      .set('User-Agent', 'Mobile')
      .expect(200);

    const responseUsersBody = await JSON.parse(response.text);

    expect(responseUsersBody).toHaveProperty('message');
    expect(responseUsersBody).toHaveProperty('data');
    expect(responseUsersBody.data).toHaveProperty('totalCount');
    expect(responseUsersBody.data).toHaveProperty('limit');
    expect(responseUsersBody.data).toHaveProperty('offset');
    expect(responseUsersBody.data).toHaveProperty('users');

    return responseUsersBody;
  } catch (error) {
    await Promise.all(
      [...users].map(async (_) => {
        return deleteSession(app, _.id);
      }),
    );
  }
};

export const getUsersWithParams = async (app, users) => {
  try {
    const limit = 5;
    const response = await request(app.getHttpServer())
      .get(`/users`)
      .set('User-Agent', 'Mobile')
      .query({
        limit,
        offset: 0,
      })
      .expect(200);

    const responseBody = await JSON.parse(response.text);

    expect(responseBody).toHaveProperty('message');
    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('totalCount');
    expect(responseBody.data).toHaveProperty('limit');
    expect(responseBody.data).toHaveProperty('offset');
    expect(responseBody.data).toHaveProperty('users');
    expect(responseBody.data.user.length).toBe(limit);
    return responseBody;
  } catch (error) {
    await Promise.all(
      [...users].map(async (_) => {
        return deleteSession(app, _.id);
      }),
    );
  }
};

export const getUsersWrongParams = async (app, users) => {
  try {
    const limit = 50;
    const maxLimit = 10;
    const response = await request(app.getHttpServer())
      .get(`/users`)
      .set('User-Agent', 'Mobile')
      .query({
        limit,
        offset: 0,
      })
      .expect(200);

    const responseBody = await JSON.parse(response.text);

    expect(responseBody).toHaveProperty('message');
    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('totalCount');
    expect(responseBody.data).toHaveProperty('limit');
    expect(responseBody.data).toHaveProperty('offset');
    expect(responseBody.data).toHaveProperty('users');
    expect(responseBody.data.user.length).not.toBe(limit);
    expect(responseBody.data.user.length).toBe(maxLimit);
    return responseBody;
  } catch (error) {
    await Promise.all(
      [...users].map(async (_) => {
        return deleteSession(app, _.id);
      }),
    );
  }
};

export const usersCount = async (app, users) => {
  try {
    const response = await request(app.getHttpServer())
      .get(`/users/count`)
      .set('User-Agent', 'Mobile')
      .expect(200);

    const responseBody = await JSON.parse(response.text);

    expect(responseBody).toHaveProperty('message');
    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('count');

    return responseBody;
  } catch (error) {
    await Promise.all(
      [...users].map(async (_) => {
        return deleteSession(app, _.id);
      }),
    );
  }
};

export const getUserById = async (app, id: number) => {
  const response = await request(app.getHttpServer())
    .get(`/users/user/byId/${id}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id', id);
  expect(responseBody.data).toHaveProperty('email');

  return responseBody;
};

export const getUserWithFullData = async (app, id: number) => {
  const response = await request(app.getHttpServer())
    .get(`/users/user/byId/${id}/fullData`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');

  return responseBody;
};

export const getUserByEmail = async (app: INestApplication, email: string) => {
  const response = await request(app.getHttpServer())
    .get(`/users/user/byEmail/${email}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody: GetUserOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('email', email);

  return responseBody;
};

export const deleteUser = async (app, id: number, adminAccessToken: string) => {
  const response = await request(app.getHttpServer())
    .delete(`/users/user/byId/${id}`)
    .set('Authorization', `Bearer ${adminAccessToken}`)
    .set('User-Agent', 'Desktop')
    .expect(200);

  const responseBody = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('email');

  return responseBody;
};

// full
//self
export const getSelfF = async (app, { responseVerifyBody }) => {
  await getSelf(app, responseVerifyBody.data.jwtToken);
};

export const updateSelfF = async (app, { responseVerifyBody }) => {
  const updateData: UpdateUserDto = {
    email: 'new_e2eTest@gmail.com',
    password: '321_QWE_qwe_!@#',
  };

  await updateSelf(app, responseVerifyBody.data.jwtToken, updateData);
  await getSelf(app, responseVerifyBody.data.jwtToken);
};

// other

export const getOtherF = async (app, data) => {
  const users = [...data].map((data) => {
    return data?.responseBody?.person;
  });

  await getUsers(app, users);
  await getUsersWithParams(app, users);
  await getUsersWrongParams(app, users);
  await usersCount(app, users);
};

export const getAnotherF = async (app, { responseBody }) => {
  await getUserById(app, responseBody.person.id);
  await getUserWithFullData(app, responseBody.person.id);
  await getUserByEmail(app, responseBody.person.email);
};

export const deleteAnotherF = async (
  app,
  data,
  mockUser,
  AdminData: fullSignUpType,
) => {
  await deleteUser(app, data.id, AdminData.responseBody.jwtToken);
};

// get users by name surname middle name

export const getUserByName = async (
  app,
  jwtToken: string,
  data: GetUserProfileByNameDto,
) => {
  const response = await request(app.getHttpServer())
    .get(`/users/by/name`)
    .set('Authorization', `Bearer ${jwtToken}`)
    .set('User-Agent', 'Mobile')
    .query(data)
    .expect(200);

  const responseBody: GetUsersByNameOkResponse = await JSON.parse(
    response.text,
  );

  expect(responseBody).toHaveProperty('data');
  expect(responseBody).toHaveProperty('limit');
  expect(responseBody).toHaveProperty('offset');
  expect(responseBody.data.length).toBeGreaterThan(0);
  expect(responseBody.data[0]).toHaveProperty('firstName');
  expect(responseBody.data[0]).toHaveProperty('langCode');
  expect(responseBody.data[0]).toHaveProperty('middleName');
};

export const getUserByNameF = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  mockUser,
) => {
  const mockUsers = [
    mockUser,
    mockUser,
    mockUser,
    mockUser,
    mockUser,
    mockUser,
    mockUser,
    mockUser,
    mockUser,
    mockUser,
    mockUser,
    mockUser,
  ].map((user: CreateUserDto, index) => {
    return {
      ...user,
      email: `${user.email.substring(
        user.email.indexOf('@'),
      )}_${index}@gmail.com`,
    };
  });

  await fullSignUp(app, mockUsers[0]);
  await fullSignUp(app, mockUsers[1]);
  await fullSignUp(app, mockUsers[2]);
  await fullSignUp(app, mockUsers[3]);
  await fullSignUp(app, mockUsers[4]);
  await fullSignUp(app, mockUsers[5]);
  await fullSignUp(app, mockUsers[6]);
  await fullSignUp(app, mockUsers[7]);

  await getUserByName(app, responseVerifyBody.data.jwtToken, {
    limit: 10,
    offset: 0,
    name: 'I',
  });
};
