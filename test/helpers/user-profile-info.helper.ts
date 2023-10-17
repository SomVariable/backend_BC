import { CreateUserProfileDto } from 'src/api/user-profile/dto/create-user-profile.dto';
import { UserTranslationOkResponse } from 'src/api/user-profile/dto/ok-response/ok.dto';
import { UpdateUserProfileDto } from 'src/api/user-profile/dto/update-user-profile.dto';
import { LANGS, LangCodeDto } from 'src/common/dto/translation-param.dto';
import * as request from 'supertest';
import { fullSignUpType } from 'test/types/test.types';

export const createUserProfile = async (
  app,
  dto: CreateUserProfileDto,
  params: LangCodeDto,
  jwt: string,
) => {
  const response = await request(app.getHttpServer())
    .post(`/user-profile/translation/${params.langCode}`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwt}`)
    .send(dto)
    .expect(201);

  const responseBody: UserTranslationOkResponse = await JSON.parse(
    response.text,
  );
  const {
    description,
    firstName,
    middleName,
    position,
    smallDescription,
    status,
    surnameName,
  } = dto;

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('description', description);
  expect(responseBody.data).toHaveProperty('firstName', firstName);
  expect(responseBody.data).toHaveProperty('middleName', middleName);
  expect(responseBody.data).toHaveProperty('position', position);
  expect(responseBody.data).toHaveProperty(
    'smallDescription',
    smallDescription,
  );
  expect(responseBody.data).toHaveProperty('status', status);
  expect(responseBody.data).toHaveProperty('surnameName', surnameName);
  expect(responseBody.data).toHaveProperty('userId');
};

export const updateUserProfile = async (
  app,
  dto: UpdateUserProfileDto,
  params: LangCodeDto,
  jwt: string,
) => {
  const response = await request(app.getHttpServer())
    .patch(`/user-profile/translation/${params.langCode}`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwt}`)
    .send(dto)
    .expect(200);

  const responseBody: UserTranslationOkResponse = await JSON.parse(
    response.text,
  );
  const { description, firstName, middleName, smallDescription, surnameName } =
    dto;

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('description', description);
  expect(responseBody.data).toHaveProperty('firstName', firstName);
  expect(responseBody.data).toHaveProperty('middleName', middleName);
  expect(responseBody.data).toHaveProperty(
    'smallDescription',
    smallDescription,
  );
  expect(responseBody.data).toHaveProperty('surnameName', surnameName);
  expect(responseBody.data).toHaveProperty('userId');
};

export const getUserProfile = async (app, params: LangCodeDto, jwt: string) => {
  const response = await request(app.getHttpServer())
    .get(`/user-profile/translation/${params.langCode}`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwt}`)
    .expect(200);

  const responseBody: UserTranslationOkResponse = await JSON.parse(
    response.text,
  );

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('description');
  expect(responseBody.data).toHaveProperty('firstName');
  expect(responseBody.data).toHaveProperty('middleName');
  expect(responseBody.data).toHaveProperty('smallDescription');
  expect(responseBody.data).toHaveProperty('surnameName');
  expect(responseBody.data).toHaveProperty('userId');
};

export const userProfileF = async (app, data: fullSignUpType) => {
  await createUserProfile(
    app,
    {
      description: 'description',
      firstName: 'firstName',
      middleName: 'middleName',
      position: 'position',
      smallDescription: 'smallDescription',
      status: 'status',
      surnameName: 'surnameName',
    },
    {
      langCode: LANGS.RU,
    },
    data.responseVerifyBody.data.jwtToken,
  );

  await createUserProfile(
    app,
    {
      description: 'description',
      firstName: 'firstName',
      middleName: 'middleName',
      position: 'position',
      smallDescription: 'smallDescription',
      status: 'status',
      surnameName: 'surnameName',
    },
    {
      langCode: LANGS.EN,
    },
    data.responseVerifyBody.data.jwtToken,
  );

  await getUserProfile(
    app,
    { langCode: LANGS.RU },
    data.responseVerifyBody.data.jwtToken,
  );

  await getUserProfile(
    app,
    { langCode: LANGS.EN },
    data.responseVerifyBody.data.jwtToken,
  );

  await updateUserProfile(
    app,
    {
      description: 'description_UPDATE',
      firstName: 'firstName_UPDATE',
      middleName: 'middleName_UPDATE',
      smallDescription: 'smallDescription_UPDATE',
      surnameName: 'surnameName_UPDATE',
    },
    { langCode: LANGS.RU },
    data.responseVerifyBody.data.jwtToken,
  );
};
