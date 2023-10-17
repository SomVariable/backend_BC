import { ProfessionalInterest } from '@prisma/client';
import { CreateProfessionalInterestDto } from 'src/api/professional-interest/dto/create-professional-interest.dto';
import { PInterestInfoOkResponse } from 'src/api/professional-interest/dto/ok-response/ok-info.dto';
import { PInterestOkResponse } from 'src/api/professional-interest/dto/ok-response/ok.dto';
import { UpdateProfessionalInterestDto } from 'src/api/professional-interest/dto/update-professional-interest.dto';
import * as request from 'supertest';
import { fullSignUpType } from 'test/types/test.types';

export const createPI = async (app, { responseVerifyBody }: fullSignUpType) => {
  const response = await request(app.getHttpServer())
    .post(`/professional-interest`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .expect(201);

  const responseBody: PInterestOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('userId');

  return responseBody;
};

export const deletePI = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  PI: ProfessionalInterest,
) => {
  const response = await request(app.getHttpServer())
    .delete(`/professional-interest/${PI.id}`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .expect(200);

  const responseBody: PInterestOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('userId');

  return responseBody;
};

export const createInfoPI = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  PI: ProfessionalInterest,
) => {
  const dto: CreateProfessionalInterestDto = {
    title: 'programming',
  };

  const response = await request(app.getHttpServer())
    .post(`/professional-interest/${PI.id}/translation/en`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .send(dto)
    .expect(201);

  const responseBody: PInterestInfoOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('langCode');
  expect(responseBody.data).toHaveProperty('professionalInterestId', PI.id);
  expect(responseBody.data).toHaveProperty('title', dto.title);

  return responseBody;
};

export const updateInfoPI = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  PI: ProfessionalInterest,
) => {
  const dto: UpdateProfessionalInterestDto = {
    title: 'programming_2',
  };

  const response = await request(app.getHttpServer())
    .patch(`/professional-interest/${PI.id}/translation/en`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .send(dto)
    .expect(200);

  const responseBody: PInterestInfoOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('langCode');
  expect(responseBody.data).toHaveProperty('professionalInterestId', PI.id);
  expect(responseBody.data).toHaveProperty('title', dto.title);

  return responseBody;
};

export const professionalInterestF = async (app, data: fullSignUpType, _) => {
  const PIRes = await createPI(app, data);
  await createInfoPI(app, data, PIRes.data);
  await updateInfoPI(app, data, PIRes.data);
  await deletePI(app, data, PIRes.data);
};
