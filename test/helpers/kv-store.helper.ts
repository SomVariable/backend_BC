import { INestApplication } from '@nestjs/common';
import { Session } from 'src/api/kv-store/kv-types/kv-store.type';
import * as request from 'supertest';

export const getSession = async (
  app: INestApplication,
  userId: number,
  session?: Partial<Session>,
) => {
  const responseKvStore = await request(app.getHttpServer())
    .get(`/kv-store/session/${userId}`)
    .set('User-Agent', 'Mobile')
    .expect(200);
  const responseKvStoreBody = await JSON.parse(responseKvStore.text);

  expect(responseKvStoreBody).toHaveProperty('message');
  expect(responseKvStoreBody).toHaveProperty('data');
  expect(responseKvStoreBody.data).toHaveProperty('id');
  expect(responseKvStoreBody.data).toHaveProperty('status');
  expect(responseKvStoreBody.data).toHaveProperty('verificationKey');
  expect(responseKvStoreBody.data).toHaveProperty('verificationTimestamp');

  return responseKvStoreBody;
};

export const deleteSession = async (app, userId: number) => {
  const responseKvStore = await request(app.getHttpServer())
    .get(`/kv-store/session/${userId}`)
    .set('User-Agent', 'Mobile')
    .expect(200);
  const responseKvStoreBody = await JSON.parse(responseKvStore.text);

  expect(responseKvStoreBody).toHaveProperty('message');
  expect(responseKvStoreBody).toHaveProperty('data');

  return responseKvStore;
};

export const blockSession = async (app, id: number) => {
  const responseKvStore = await request(app.getHttpServer())
    .patch(`/kv-store/session/${id}/block`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseKvStoreBody = await JSON.parse(responseKvStore.text);

  expect(responseKvStoreBody.data).toHaveProperty('status', 'BLOCKED');

  return responseKvStoreBody;
};

export const activeSession = async (app, id: number) => {
  const responseKvStoreActive = await request(app.getHttpServer())
    .patch(`/kv-store/session/${id}/active`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseKvStoreActiveBody = await JSON.parse(
    responseKvStoreActive.text,
  );

  expect(responseKvStoreActiveBody.data).toHaveProperty('status', 'ACTIVE');

  return responseKvStoreActiveBody;
};
