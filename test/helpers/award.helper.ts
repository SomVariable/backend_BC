import * as request from 'supertest';
import { Award } from '@prisma/client';
import { GetAwardOkResponse } from 'src/api/award/dto/ok-response/get-award.dto';
import { GetAwardsOkResponse } from 'src/api/award/dto/ok-response/get-awards.dto';
import { CreatedOkResponse } from 'src/api/education/dto/ok-response/created.dto';
import { fullSignUpType } from 'test/types/test.types';
import { DeletedAwardOkResponse } from 'src/api/award/dto/ok-response/deleted.dto';
import { CreatedInfoAwardOkResponse } from 'src/api/award/dto/ok-response/info-created.dto';
import { CreateAwardDto } from 'src/api/award/dto/create-award.dto';
import { UpdatedInfoAwardOkResponse } from 'src/api/award/dto/ok-response/info-updated.dto';
import { UpdateAwardDto } from 'src/api/award/dto/update-award.dto';

export const createAward = async (
  app,
  { responseVerifyBody }: fullSignUpType,
): Promise<CreatedOkResponse> => {
  const response = await request(app.getHttpServer())
    .post(`/award`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .expect(201);

  const responseBody: CreatedOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('userId');

  return responseBody;
};

const getAward = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  award: Award,
): Promise<GetAwardOkResponse> => {
  const response = await request(app.getHttpServer())
    .get(`/award/${award.id}`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .expect(200);

  const responseBody: GetAwardOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('userId');

  return responseBody;
};

const getAwards = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  award: Award,
): Promise<GetAwardsOkResponse> => {
  const response = await request(app.getHttpServer())
    .get(`/award/${award.id}`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .expect(200);

  const responseBody: GetAwardsOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('userId');

  return responseBody;
};

const deleteAward = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  award: Award,
): Promise<DeletedAwardOkResponse> => {
  const response = await request(app.getHttpServer())
    .get(`/award/${award.id}`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .expect(200);

  const responseBody: DeletedAwardOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('userId');

  return responseBody;
};

const createAwardInfo = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  award: Award,
): Promise<CreatedInfoAwardOkResponse> => {
  const dto: CreateAwardDto = {
    title: 'BestOfBest_1',
  };
  const response = await request(app.getHttpServer())
    .post(`/award/${award.id}/translation/en`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .send(dto)
    .expect(201);

  const responseBody: CreatedInfoAwardOkResponse = await JSON.parse(
    response.text,
  );

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('langCode');
  expect(responseBody.data).toHaveProperty('title');
  expect(responseBody.data).toHaveProperty('awardId', award.id);

  return responseBody;
};

const updateAwardInfo = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  award: Award,
): Promise<UpdatedInfoAwardOkResponse> => {
  const dto: UpdateAwardDto = {
    title: 'BestOfBest_2',
  };

  const response = await request(app.getHttpServer())
    .patch(`/award/${award.id}/translation/en`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .send(dto)
    .expect(200);

  const responseBody: UpdatedInfoAwardOkResponse = await JSON.parse(
    response.text,
  );

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('langCode');
  expect(responseBody.data).toHaveProperty('title', dto.title);
  expect(responseBody.data).toHaveProperty('awardId', award.id);

  return responseBody;
};

export const awardsF = async (app, data: fullSignUpType, _) => {
  const awardRes = await createAward(app, data);
  await getAward(app, data, awardRes.data);
  await createAwardInfo(app, data, awardRes.data);
  await updateAwardInfo(app, data, awardRes.data);
  await deleteAward(app, data, awardRes.data);
};
