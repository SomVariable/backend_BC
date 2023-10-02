import { INestApplication, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import { UpdateUserDto } from 'src/api/user/dto/update-user.dto';
import { deleteSession } from './kv-store.helper';
import { fullSignUpType } from 'test/types/test.types';
import { requestWithAdminPermission } from './auth.helper';
import { CreateEducationDto } from 'src/api/education/dto/create-education.dto';
import { CreatedOkResponse } from 'src/api/education/dto/ok-response/created.dto';
import { UpdatedOkResponse } from 'src/api/education/dto/ok-response/updated.dto';
import { UpdateEducationDto } from 'src/api/education/dto/update-education.dto';
import { DeletedOkResponse } from 'src/api/education/dto/ok-response/deleted.dto';
import { Education } from '@prisma/client';
import { CreateEducationInfoDto } from 'src/api/education/dto/create-education-info.dto';
import { InfoCreatedOkResponse } from 'src/api/education/dto/ok-response/info-created';
import { UpdateEducationInfoDto } from 'src/api/education/dto/update-education-info.dto';
import { InfoUpdatedOkResponse } from 'src/api/education/dto/ok-response/info-updated';

export const clearUser = async (app, mockUser) => {
  const response = await request(app.getHttpServer())
    .get(`/users/user/byEmail/${mockUser.email}`)
    .set('User-Agent', 'Mobile')

  const data = await JSON.parse(response.text);

  if (data.data?.id) {
    const reqWithAdminPermission = requestWithAdminPermission(app, data.data, mockUser)
    await reqWithAdminPermission(deleteAnotherF)

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
export const getUsers = async (app, users) => {
  try {
    const response = await request(app.getHttpServer())
      .get(`/users`)
      .set('User-Agent', 'Mobile')
      .expect(200)

    const responseUsersBody = await JSON.parse(response.text);

    expect(responseUsersBody).toHaveProperty('message');
    expect(responseUsersBody).toHaveProperty('data');
    expect(responseUsersBody.data).toHaveProperty('totalCount');
    expect(responseUsersBody.data).toHaveProperty('limit');
    expect(responseUsersBody.data).toHaveProperty('offset');
    expect(responseUsersBody.data).toHaveProperty('users');

    return responseUsersBody
  } catch (error) {
    await Promise.all([...users].map(async (_) => {
      return deleteSession(app, _.id)
    }))
  }
}

export const getUsersWithParams = async (app, users) => {
  try {
    const limit = 5
    const response = await request(app.getHttpServer())
      .get(`/users`)
      .set('User-Agent', 'Mobile')
      .query({
        limit,
        offset: 0
      })
      .expect(200)

    const responseBody = await JSON.parse(response.text);

    expect(responseBody).toHaveProperty('message');
    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('totalCount');
    expect(responseBody.data).toHaveProperty('limit');
    expect(responseBody.data).toHaveProperty('offset');
    expect(responseBody.data).toHaveProperty('users');
    expect(responseBody.data.user.length).toBe(limit);
    return responseBody

  } catch (error) {
    await Promise.all([...users].map(async (_) => {
      return deleteSession(app, _.id)
    }))
  }
}

export const getUsersWrongParams = async (app, users) => {
  try {
    const limit = 50
    const maxLimit = 10
    const response = await request(app.getHttpServer())
      .get(`/users`)
      .set('User-Agent', 'Mobile')
      .query({
        limit,
        offset: 0
      })
      .expect(200)

    const responseBody = await JSON.parse(response.text);

    expect(responseBody).toHaveProperty('message');
    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('totalCount');
    expect(responseBody.data).toHaveProperty('limit');
    expect(responseBody.data).toHaveProperty('offset');
    expect(responseBody.data).toHaveProperty('users');
    expect(responseBody.data.user.length).not.toBe(limit);
    expect(responseBody.data.user.length).toBe(maxLimit);
    return responseBody

  } catch (error) {
    await Promise.all([...users].map(async (_) => {
      return deleteSession(app, _.id)
    }))
  }
}

export const usersCount = async (app, users) => {
  try {
    const response = await request(app.getHttpServer())
      .get(`/users/count`)
      .set('User-Agent', 'Mobile')
      .expect(200)

    const responseBody = await JSON.parse(response.text);

    expect(responseBody).toHaveProperty('message');
    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('count');

    return responseBody
  } catch (error) {
    await Promise.all([...users].map(async (_) => {
      return deleteSession(app, _.id)
    }))
  }
}

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

  return responseBody
}

export const getUserWithFullData = async (app, id: number) => {
  const response = await request(app.getHttpServer())
    .get(`/users/user/byId/${id}/fullData`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');

  return responseBody
}

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

  return responseBody

}

// education 

export const createEducation = async (
  app, { responseVerifyBody }: fullSignUpType
): Promise<CreatedOkResponse> => {
  const educationDTO: CreateEducationDto = {
    specialty: "programmer",
    graduationYear: "2010-10-10",
    studyYear: "2015-10-10",
    qualification: "specialist"
  }

  const response = await request(app.getHttpServer())
    .post(`/education`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Mobile')
    .send(educationDTO)
    .expect(201);

  const responseBody: CreatedOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('graduationYear');
  expect(responseBody.data).toHaveProperty('studyYear');
  expect(responseBody.data).toHaveProperty('qualification');
  expect(responseBody.data).toHaveProperty('specialty');
  expect(responseBody.data).toHaveProperty('userId');

  return responseBody
}

export const getEducation = async (
  app, 
  { responseVerifyBody }: fullSignUpType,
  education: Education) => {
  const response = await request(app.getHttpServer())
    .get(`/education/${education.id}`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody: UpdatedOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('graduationYear');
  expect(responseBody.data).toHaveProperty('studyYear');
  expect(responseBody.data).toHaveProperty('qualification');
  expect(responseBody.data).toHaveProperty('specialty');
  expect(responseBody.data).toHaveProperty('userId');

  return responseBody
}

export const updateEducation = async (
  app, 
  { responseVerifyBody }: fullSignUpType, 
  education: Education): Promise<UpdatedOkResponse> => {
  const educationDTO: UpdateEducationDto = {
    specialty: "programmer",
    graduationYear: "2010-10-10",
    studyYear: "2015-10-10",
    qualification: "specialist"
  }

  const response = await request(app.getHttpServer())
    .patch(`/education/${education.id}`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Mobile')
    .send(educationDTO)
    .expect(200);

  const responseBody: UpdatedOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('graduationYear');
  expect(responseBody.data).toHaveProperty('studyYear');
  expect(responseBody.data).toHaveProperty('qualification');
  expect(responseBody.data).toHaveProperty('specialty');
  expect(responseBody.data).toHaveProperty('userId');

  return responseBody
}

export const deleteEducation = async (
  app, { responseVerifyBody }: fullSignUpType,
  education: Education
): Promise<DeletedOkResponse> => {
  const response = await request(app.getHttpServer())
    .delete(`/education/${education.id}`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody: DeletedOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('graduationYear');
  expect(responseBody.data).toHaveProperty('studyYear');
  expect(responseBody.data).toHaveProperty('qualification');
  expect(responseBody.data).toHaveProperty('specialty');
  expect(responseBody.data).toHaveProperty('userId');

  return responseBody
}

export const createEducationTransl = async (
  app, { responseVerifyBody }: fullSignUpType,
  education: Education) => {
    const langCode = 'en' 
    const educationDTO: CreateEducationInfoDto = {
    title: "title",
    university: "university"
  }

  const response = await request(app.getHttpServer())
    .post(`/education/${education.id}/translation/${langCode}`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Mobile')
    .send(educationDTO)
    .expect(201);

  const responseBody: InfoCreatedOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('educationId', education.id);
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('langCode', langCode);
  expect(responseBody.data).toHaveProperty('title', educationDTO.title);
  expect(responseBody.data).toHaveProperty('university', educationDTO.university);

  return responseBody
}

export const updateEducationTransl = async (app, { responseVerifyBody }: fullSignUpType,
  education: Education) => {
    const langCode = 'en' 
    const educationDTO: UpdateEducationInfoDto = {
    title: "title2",
    university: "university2"
  }

  const response = await request(app.getHttpServer())
    .patch(`/education/${education.id}/translation/${langCode}`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Mobile')
    .send(educationDTO)
    .expect(200);

  const responseBody: InfoUpdatedOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('educationId', education.id);
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('langCode', langCode);
  expect(responseBody.data).toHaveProperty('title', educationDTO.title);
  expect(responseBody.data).toHaveProperty('university', educationDTO.university);

  return responseBody
}

// full 
//self
export const getSelfF = async (app, { responseVerifyBody }, mockUser) => {
  await getSelf(app, responseVerifyBody.data.jwtToken)
}

export const updateSelfF = async (app, { responseVerifyBody }, mockUser) => {
  const updateData: UpdateUserDto = {
    email: "new_e2eTest@gmail.com",
    password: '321_QWE_qwe_!@#'
  }

  await updateSelf(app, responseVerifyBody.data.jwtToken, updateData)
  await getSelf(app, responseVerifyBody.data.jwtToken)
}

// other

export const getOtherF = async (app, data, mockUser) => {
  const users = [...data].map(data => {
    return data?.responseBody?.person
  })

  await getUsers(app, users)
  await getUsersWithParams(app, users)
  await getUsersWrongParams(app, users)
  await usersCount(app, users)
}

export const getAnotherF = async (app, { responseBody }, mockUser) => {
  await getUserById(app, responseBody.person.id)
  await getUserWithFullData(app, responseBody.person.id)
  await getUserByEmail(app, responseBody.person.email)
}

export const deleteAnotherF = async (
  app, data,
  mockUser,
  AdminData: fullSignUpType) => {
  await deleteUser(
    app,
    data.id,
    AdminData.responseBody.jwtToken
  )
}

export const educationCRUD= async (app, data, _) => {
  const educationRes = await createEducation(app, data)
  await getEducation(app, data, educationRes.data)
  
  await createEducationTransl(app, data, educationRes.data)
  await updateEducationTransl(app, data, educationRes.data)

  await updateEducation(app, data, educationRes.data)
  
  await deleteEducation(app, data, educationRes.data)
}

// education

// export const createEducationF = async () => {
//   await createEducation()
// }