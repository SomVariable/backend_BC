import * as request from 'supertest';
import { FirstUserOkResponse } from 'src/api/auth/dto/ok-response/first-user.dto';
import { CreateAreaDto } from 'src/api/area/dto/create-area.dto';
import { CreatedAreaOkResponse } from 'src/api/area/dto/ok-response/created.dto';
import {
  Area,
  CategoryTranslationType,
  Practice,
  Service,
} from '@prisma/client';
import { UpdateAreaDto } from 'src/api/area/dto/update-area.dto';
import { UpdatedAreaOkResponse } from 'src/api/area/dto/ok-response/updated.dto';
import { GetAreaOkResponse } from 'src/api/area/dto/ok-response/get-area.dto';
import { DeletedAreaOkResponse } from 'src/api/area/dto/ok-response/deleted.dto';
import { CreateCategoryDto } from 'src/api/area/dto/create-category.dto';
import { CategoryTranslationCreatedOkResponse } from 'src/api/category-translation/dto/ok-response/created.dto';
import { UpdateCategoryDto } from 'src/api/category-translation/dto/update-category.dto';
import { CategoryTranslationUpdatedOkResponse } from 'src/api/category-translation/dto/ok-response/updated.dto';
import { signUpAdminType } from 'test/types/test.types';
import { CreateOfferDto } from 'src/api/service/dto/create-offer.dto';
import { CreatePracticeDto } from 'src/api/practice/dto/create-practice.dto';
import { CreatedPracticeOkResponse } from 'src/api/practice/dto/ok-response/created.dto';
import { UpdatePracticeDto } from 'src/api/practice/dto/update-practice.dto';
import { UpdatedPracticeOkResponse } from 'src/api/practice/dto/ok-response/updated.dto';
import { GetPracticeOkResponse } from 'src/api/practice/dto/ok-response/get-practice.dto';
import { DeletedPracticeOkResponse } from 'src/api/practice/dto/ok-response/deleted.dto';
import { DeletedOfferOkResponse } from 'src/api/service/dto/ok-response/deleted.dto';
import { GetOfferOkResponse } from 'src/api/service/dto/ok-response/get-offer.dto';
import { UpdatedOfferOkResponse } from 'src/api/service/dto/ok-response/updated.dto';
import { CreatedOfferOkResponse } from 'src/api/service/dto/ok-response/created.dto';
import { GetAreaFullOkResponse } from 'src/api/area/dto/ok-response/get-area-full.dto';

export const clearCategory = async (app, data, mockUser, reqAdminData) => {
  const token = `Bearer ${reqAdminData.responseBody.jwtToken}`;
  await request(app.getHttpServer())
    .delete(`/area`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', token)
    .expect(200);

  await request(app.getHttpServer())
    .delete(`/practice`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', token)
    .expect(200);

  await request(app.getHttpServer())
    .delete(`/service`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${reqAdminData.responseBody.jwtToken}`)
    .expect(200);

  return true;
};

export const createArea = async (app, { jwtToken }: FirstUserOkResponse) => {
  const dto: CreateAreaDto = {
    practicesIds: [],
  };
  const createAreaRes = await request(app.getHttpServer())
    .post(`/area`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwtToken}`)
    .send(dto)
    .expect(201);

  const responseBody: CreatedAreaOkResponse = await JSON.parse(
    createAreaRes.text,
  );
  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');

  return responseBody;
};

export const updateArea = async (
  app,
  { jwtToken }: FirstUserOkResponse,
  area: Area,
  practiceIds: number[],
) => {
  const dto: UpdateAreaDto = {
    practicesIds: practiceIds,
  };
  const createAreaRes = await request(app.getHttpServer())
    .patch(`/area/${area.id}`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwtToken}`)
    .send(dto)
    .expect(200);

  const responseBody: UpdatedAreaOkResponse = await JSON.parse(
    createAreaRes.text,
  );

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('CategoryTranslation');
  expect(responseBody.data).toHaveProperty('practicesIds');

  const containsValues = [...responseBody.data.practicesIds]
    .map((practice) => practice.id)
    .every((value) => practiceIds.includes(value));
  expect(containsValues).toBe(true);
  return responseBody;
};

export const updateAreaAddDelFunction = async (
  app,
  { jwtToken }: FirstUserOkResponse,
  area: Area,
  practiceIds: number[] = [],
) => {
  const areaFull = await getAreaFull(app, area);
  const dto: UpdateAreaDto = {
    practicesIds: practiceIds,
  };

  const updateAreaResWithAdded = await request(app.getHttpServer())
    .patch(`/area/${area.id}/add`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwtToken}`)
    .send(dto)
    .expect(200);

  const responseBodyAdd: UpdatedAreaOkResponse = await JSON.parse(
    updateAreaResWithAdded.text,
  );

  expect(responseBodyAdd).toHaveProperty('message');
  expect(responseBodyAdd).toHaveProperty('data');
  expect(responseBodyAdd.data).toHaveProperty('id');
  expect(responseBodyAdd.data).toHaveProperty('CategoryTranslation');
  expect(responseBodyAdd.data).toHaveProperty('practicesIds');
  expect(
    [...responseBodyAdd.data.practicesIds].map((practice) => practice.id),
  ).toEqual(expect.arrayContaining(practiceIds));

  const areaResAfterDeleted = await request(app.getHttpServer())
    .patch(`/area/${area.id}/delete`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwtToken}`)
    .send(dto)
    .expect(200);

  const areaFull_after = await getAreaFull(app, area);
  const responseBody: UpdatedAreaOkResponse = await JSON.parse(
    areaResAfterDeleted.text,
  );

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('CategoryTranslation');
  expect(responseBody.data).toHaveProperty('practicesIds');

  const beforeIds = [...areaFull.data.practicesIds].map((_) => _.id);
  const afterIds = [...areaFull_after.data.practicesIds].map((_) => _.id);
  //const containsValues = beforeIds.every(value => afterIds.includes(value));

  //expect(containsValues).toBe(true);
};

export const getArea = async (app, area: Area) => {
  const createAreaRes = await request(app.getHttpServer())
    .get(`/area/${area.id}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody: GetAreaOkResponse = await JSON.parse(createAreaRes.text);
  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');

  return responseBody;
};

export const getAreaFull = async (app, area: Area) => {
  const createAreaRes = await request(app.getHttpServer())
    .get(`/area/${area.id}/full`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody: GetAreaFullOkResponse = await JSON.parse(
    createAreaRes.text,
  );

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('practicesIds');
  expect(responseBody.data).toHaveProperty('CategoryTranslation');

  return responseBody;
};

export const createCategoryInfo = async (
  app,
  { jwtToken }: FirstUserOkResponse,
  category: Area | Practice | Service,
  type: CategoryTranslationType,
) => {
  const dto: CreateCategoryDto = {
    categoryTranslationType: type,
    text: 'text',
    title: 'title',
  };
  const createAreaRes = await request(app.getHttpServer())
    .post(`/category-translation/${category.id}/translation/ru`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwtToken}`)
    .send(dto)
    .expect(201);

  const responseBody: CategoryTranslationCreatedOkResponse = await JSON.parse(
    createAreaRes.text,
  );

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty(
    'categoryTranslationType',
    dto.categoryTranslationType,
  );
  expect(responseBody.data).toHaveProperty('langCode');
  expect(responseBody.data).toHaveProperty('text', dto.text);
  expect(responseBody.data).toHaveProperty('title', dto.title);
  expect(responseBody.data).toHaveProperty('relatedId');

  return responseBody;
};

export const updateCategoryInfo = async (
  app,
  { jwtToken }: FirstUserOkResponse,
  category: Area | Practice | Service,
  type: CategoryTranslationType,
) => {
  const dto: UpdateCategoryDto = {
    text: 'text_2',
    title: 'title_2',
  };
  const createAreaRes = await request(app.getHttpServer())
    .patch(`/category-translation/${category.id}/translation/ru/${type}`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwtToken}`)
    .send(dto)
    .expect(200);

  const responseBody: CategoryTranslationUpdatedOkResponse = await JSON.parse(
    createAreaRes.text,
  );

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('categoryTranslationType');
  expect(responseBody.data).toHaveProperty('langCode');
  expect(responseBody.data).toHaveProperty('text', dto.text);
  expect(responseBody.data).toHaveProperty('title', dto.title);
  expect(responseBody.data).toHaveProperty('relatedId');

  return responseBody;
};

export const deleteArea = async (
  app,
  { jwtToken }: FirstUserOkResponse,
  area: Area,
) => {
  const createAreaRes = await request(app.getHttpServer())
    .delete(`/area/${area.id}`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwtToken}`)
    .expect(200);

  const responseBody: DeletedAreaOkResponse = await JSON.parse(
    createAreaRes.text,
  );
  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');

  return responseBody;
};

export const createService = async (app, { jwtToken }: FirstUserOkResponse) => {
  const dto: CreateOfferDto = {
    practicesIds: [],
  };
  const createAreaRes = await request(app.getHttpServer())
    .post(`/service`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwtToken}`)
    .send(dto)
    .expect(201);

  const responseBody: CreatedOfferOkResponse = await JSON.parse(
    createAreaRes.text,
  );
  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');

  return responseBody;
};

export const updateService = async (
  app,
  { jwtToken }: FirstUserOkResponse,
  service: Service,
  practiceIds: number[] = [],
) => {
  const dto: UpdateAreaDto = {
    practicesIds: practiceIds,
  };
  const createAreaRes = await request(app.getHttpServer())
    .patch(`/service/${service.id}`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwtToken}`)
    .send(dto)
    .expect(200);

  const responseBody: UpdatedOfferOkResponse = await JSON.parse(
    createAreaRes.text,
  );

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('CategoryTranslation');
  expect(responseBody.data).toHaveProperty('practicesIds');

  expect(practiceIds).toEqual(
    expect.arrayContaining(
      [...responseBody.data.practicesIds].map((category) => category.id),
    ),
  );

  return responseBody;
};

export const getService = async (app, service: Service) => {
  const createAreaRes = await request(app.getHttpServer())
    .get(`/service/${service.id}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody: GetOfferOkResponse = await JSON.parse(createAreaRes.text);
  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');

  return responseBody;
};

export const deleteService = async (
  app,
  { jwtToken }: FirstUserOkResponse,
  service: Service,
) => {
  const createAreaRes = await request(app.getHttpServer())
    .delete(`/service/${service.id}`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwtToken}`)
    .expect(200);

  const responseBody: DeletedOfferOkResponse = await JSON.parse(
    createAreaRes.text,
  );
  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');

  return responseBody;
};

export const createPractice = async (
  app,
  { jwtToken }: FirstUserOkResponse,
  dto: CreatePracticeDto = {
    areasIds: [],
    servicesIds: [],
  },
) => {
  const createPracticeRes = await request(app.getHttpServer())
    .post(`/practice`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwtToken}`)
    .send(dto)
    .expect(201);

  const responseBody: CreatedPracticeOkResponse = await JSON.parse(
    createPracticeRes.text,
  );

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');

  return responseBody;
};

export const updatePractice = async (
  app,
  { jwtToken }: FirstUserOkResponse,
  practice: Practice,
  areasIds: number[] = [],
  servicesIds: number[] = [],
) => {
  const dto: UpdatePracticeDto = {
    areasIds,
    servicesIds,
  };
  const updatePracticeRes = await request(app.getHttpServer())
    .patch(`/practice/${practice.id}`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwtToken}`)
    .send(dto)
    .expect(200);

  const responseBody: UpdatedPracticeOkResponse = await JSON.parse(
    updatePracticeRes.text,
  );

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('CategoryTranslation');
  expect(responseBody.data).toHaveProperty('servicesIds');
  expect(responseBody.data).toHaveProperty('areasIds');
  expect(areasIds).toEqual(
    expect.arrayContaining(
      [...responseBody.data.areasIds].map((area) => area.id),
    ),
  );
  expect(servicesIds).toEqual(
    expect.arrayContaining(
      [...responseBody.data.servicesIds].map((service) => service.id),
    ),
  );
  return responseBody;
};

export const getPractice = async (app, service: Service) => {
  const createPracticeRes = await request(app.getHttpServer())
    .get(`/practice/${service.id}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody: GetPracticeOkResponse = await JSON.parse(
    createPracticeRes.text,
  );
  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');

  return responseBody;
};

export const deletePractice = async (
  app,
  { jwtToken }: FirstUserOkResponse,
  practice: Practice,
) => {
  const createPracticeRes = await request(app.getHttpServer())
    .delete(`/practice/${practice.id}`)
    .set('User-Agent', 'Mobile')
    .set('Authorization', `Bearer ${jwtToken}`)
    .expect(200);

  const responseBody: DeletedPracticeOkResponse = await JSON.parse(
    createPracticeRes.text,
  );
  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');

  return responseBody;
};

export const areaCRUD = async (
  app,
  data,
  _,
  { responseBody }: signUpAdminType,
) => {
  const createAreaRes = await createArea(app, responseBody);

  // first-update
  console.log('Step 1 ', createAreaRes.data.id);
  const practice_1Res = await createPractice(app, responseBody, {
    areasIds: [createAreaRes.data.id],
    servicesIds: [],
  });
  console.log('Step 2 ', createAreaRes.data.id);
  const practice_2Res = await createPractice(app, responseBody, {
    areasIds: [createAreaRes.data.id],
    servicesIds: [],
  });
  console.log('Step 3 ', createAreaRes.data.id);
  const practice_3Res = await createPractice(app, responseBody, {
    areasIds: [createAreaRes.data.id],
    servicesIds: [],
  });

  const idArray = [
    practice_2Res.data.id,
    practice_3Res.data.id,
    practice_1Res.data.id,
  ];
  const updatedArea = await updateArea(
    app,
    responseBody,
    createAreaRes.data,
    [],
  );
  console.log('Step 4 ', createAreaRes.data.id);
  const practice_4Res = await createPractice(app, responseBody, {
    areasIds: [createAreaRes.data.id],
    servicesIds: [],
  });
  console.log('Step 5 ', createAreaRes.data.id);
  const practice_5Res = await createPractice(app, responseBody, {
    areasIds: [createAreaRes.data.id],
    servicesIds: [],
  });
  console.log('Step 6 ', createAreaRes.data.id);
  const practice_6Res = await createPractice(app, responseBody, {
    areasIds: [createAreaRes.data.id],
    servicesIds: [],
  });
  console.log('Step 7 ', createAreaRes.data.id);
  const idArray_2 = [
    practice_4Res.data.id,
    practice_5Res.data.id,
    practice_6Res.data.id,
  ];

  await updateAreaAddDelFunction(
    app,
    responseBody,
    createAreaRes.data,
    idArray_2,
  );

  await getArea(app, createAreaRes.data);
  await createCategoryInfo(app, responseBody, createAreaRes.data, 'AREA');
  await updateCategoryInfo(app, responseBody, createAreaRes.data, 'AREA');
  await deleteArea(app, responseBody, createAreaRes.data);
};

export const serviceCRUD = async (
  app,
  data,
  _,
  { responseBody }: signUpAdminType,
) => {
  const createServiceRes = await createService(app, responseBody);

  // first-update
  const practice_1Res = await createPractice(app, responseBody);
  const practice_2Res = await createPractice(app, responseBody);
  const practice_3Res = await createPractice(app, responseBody);

  const idArray = [
    practice_2Res.data.id,
    practice_3Res.data.id,
    practice_1Res.data.id,
  ];
  await updateService(app, responseBody, createServiceRes.data, idArray);
  await getService(app, createServiceRes.data);
  await createCategoryInfo(app, responseBody, createServiceRes.data, 'SERVICE');
  await updateCategoryInfo(app, responseBody, createServiceRes.data, 'SERVICE');
  await deleteService(app, responseBody, createServiceRes.data);
};

export const practiceCRUD = async (
  app,
  data,
  _,
  { responseBody }: signUpAdminType,
) => {
  const createPracticeRes = await createPractice(app, responseBody);
  const area_1Res = await createArea(app, responseBody);
  const area_2Res = await createArea(app, responseBody);
  const area_3Res = await createArea(app, responseBody);

  const idAreaArray = [area_2Res.data.id, area_3Res.data.id, area_1Res.data.id];
  const service_1Res = await createService(app, responseBody);
  const service_2Res = await createService(app, responseBody);
  const service_3Res = await createService(app, responseBody);

  const idServiceArray = [
    service_2Res.data.id,
    service_3Res.data.id,
    service_1Res.data.id,
  ];
  await updatePractice(
    app,
    responseBody,
    createPracticeRes.data,
    idAreaArray,
    idServiceArray,
  );
  await getPractice(app, createPracticeRes.data);
  await createCategoryInfo(
    app,
    responseBody,
    createPracticeRes.data,
    'PRACTICE',
  );
  await updateCategoryInfo(
    app,
    responseBody,
    createPracticeRes.data,
    'PRACTICE',
  );
  await deletePractice(app, responseBody, createPracticeRes.data);
};
