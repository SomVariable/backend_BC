import {
  CreateUserCategoryDto,
  CreateUserPartnerCategoryDto,
} from 'src/api/user/dto/create-user-category.dto';
import { CreateEmployeeOkResponse } from 'src/api/user/dto/ok-response/create-employee-category-ok-re.dto';
import { CreateManagerOkResponse } from 'src/api/user/dto/ok-response/create-manager-category-ok-re.dto';
import { CreatePartnerOkResponse } from 'src/api/user/dto/ok-response/create-partner-category-ok.dto';
import { GetUsersByCategoryOkResponse } from 'src/api/user/dto/ok-response/get-users-by-category.dto';
import { GetUsersByPartnerCategoryOkResponse } from 'src/api/user/dto/ok-response/get-users-by-partner-category.dto';
import * as request from 'supertest';
import { fullSignUp } from './auth.helper';
import { signUpAdminType } from 'test/types/test.types';

export const createPartner = async (
  app,
  jwtToken: string,
  dto: CreateUserPartnerCategoryDto,
) => {
  const response = await request(app.getHttpServer())
    .post(`/users/user/user-category/partner`)
    .set('Authorization', `Bearer ${jwtToken}`)
    .set('User-Agent', 'Mobile')
    .send(dto)
    .expect(201);

  const responseBody: CreatePartnerOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('quote_en');
  expect(responseBody.data).toHaveProperty('quote_ru');
  expect(responseBody.data).toHaveProperty('userId');
};

export const createManager = async (
  app,
  jwtToken: string,
  dto: CreateUserCategoryDto,
) => {
  const response = await request(app.getHttpServer())
    .post(`/users/user/user-category/manager`)
    .set('Authorization', `Bearer ${jwtToken}`)
    .set('User-Agent', 'Mobile')
    .send(dto)
    .expect(201);

  const responseBody: CreateManagerOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('userId');
};

export const createEmployee = async (
  app,
  jwtToken: string,
  dto: CreateUserCategoryDto,
) => {
  const response = await request(app.getHttpServer())
    .post(`/users/user/user-category/employee`)
    .set('Authorization', `Bearer ${jwtToken}`)
    .set('User-Agent', 'Mobile')
    .send(dto)
    .expect(201);

  const responseBody: CreateEmployeeOkResponse = await JSON.parse(
    response.text,
  );

  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('userId');
};

export const getPartners = async (app, jwtToken: string) => {
  const response = await request(app.getHttpServer())
    .get(`/users/by/category/partners`)
    .set('Authorization', `Bearer ${jwtToken}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody: GetUsersByPartnerCategoryOkResponse = await JSON.parse(
    response.text,
  );

  expect(responseBody).toHaveProperty('data');
  expect(responseBody).toHaveProperty('limit');
  expect(responseBody).toHaveProperty('offset');
  expect(responseBody.data.length).toBeGreaterThan(0);
  expect(responseBody.data[0]).toHaveProperty('quote_en');
  expect(responseBody.data[0]).toHaveProperty('quote_ru');
  expect(responseBody.data[0]).toHaveProperty('userId');
};

export const getManagers = async (app, jwtToken: string) => {
  const response = await request(app.getHttpServer())
    .get(`/users/by/category/managers`)
    .set('Authorization', `Bearer ${jwtToken}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody: GetUsersByCategoryOkResponse = await JSON.parse(
    response.text,
  );

  expect(responseBody).toHaveProperty('data');
  expect(responseBody).toHaveProperty('limit');
  expect(responseBody).toHaveProperty('offset');
  expect(responseBody.data.length).toBeGreaterThan(0);
  expect(responseBody.data[0]).toHaveProperty('id');
  expect(responseBody.data[0]).toHaveProperty('userId');
};

export const getEmployees = async (app, jwtToken: string) => {
  const response = await request(app.getHttpServer())
    .get(`/users/by/category/employees`)
    .set('Authorization', `Bearer ${jwtToken}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody: GetUsersByCategoryOkResponse = await JSON.parse(
    response.text,
  );

  expect(responseBody).toHaveProperty('data');
  expect(responseBody).toHaveProperty('limit');
  expect(responseBody).toHaveProperty('offset');
  expect(responseBody.data.length).toBeGreaterThan(0);
  expect(responseBody.data[0]).toHaveProperty('id');
  expect(responseBody.data[0]).toHaveProperty('userId');
};

export const userCategoryF = async (
  app,
  _: null,
  mockUser,
  adminData: signUpAdminType,
) => {
  const user = await fullSignUp(app, mockUser);
  await createPartner(app, adminData.responseBody.jwtToken, {
    quote_en: 'eng',
    quote_ru: 'ru',
    userId: user.responseBody.person.id,
  });
  await createManager(app, adminData.responseBody.jwtToken, {
    userId: user.responseBody.person.id,
  });
  await createEmployee(app, adminData.responseBody.jwtToken, {
    userId: user.responseBody.person.id,
  });

  await getPartners(app, adminData.responseBody.jwtToken);
  await getManagers(app, adminData.responseBody.jwtToken);
  await getEmployees(app, adminData.responseBody.jwtToken);
};
