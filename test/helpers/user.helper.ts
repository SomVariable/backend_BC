import { INestApplication, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import { UpdateUserDto } from 'src/api/user/dto/update-user.dto';

export const clearUser = async (app, mockUser) => {

  const response = await request(app.getHttpServer())
    .get(`/users/user/byEmail/${mockUser.email}`)
    .set('User-Agent', 'Mobile')

  const data = await JSON.parse(response.text);
  
  if (data.data?.id) {
    await request(app.getHttpServer())
    .delete(`/users/user/byId/${data.data.id}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

    return true
  }

  return true

}

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

  return responseBody
}

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

  return responseBody
}

export const deleteSelf = async (app, accessToken: string) => {
  const deletedUser = await request(app.getHttpServer())
    .delete(`/user`)
    .set('Authorization', `Bearer ${accessToken}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  return deletedUser
}



export const getSelfBadRequest = async (app, accessToken: string) => {
  return await request(app.getHttpServer())
    .get(`/user`)
    .set('Authorization', `Bearer ${accessToken}`)
    .set('User-Agent', 'Mobile')
    .expect(400);
}


// other
export const getUserByEmail = async (app: INestApplication, email: string) => {  
  const response = await request(app.getHttpServer())
    .get(`/users/user/byEmail/${email}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('email', email);

  return responseBody
}


export const deleteUser = async (app, id: number) => {
  const response = await request(app.getHttpServer())
    .delete(`/users/user/byId/${id}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('email');

  return responseBody

}