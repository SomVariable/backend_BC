import { INestApplication, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import { UpdateUserDto } from 'src/api/user/dto/update-user.dto';
import { deleteSession } from './kv-store.helper';
import { fullSignUpType, signUpAdminType } from 'test/types/test.types';
import { fullSignUp, requestWithAdminPermission, userControl } from './auth.helper';
import { CreateEducationDto } from 'src/api/education/dto/create-education.dto';
import { CreatedOkResponse } from 'src/api/education/dto/ok-response/created.dto';
import { UpdatedOkResponse } from 'src/api/education/dto/ok-response/updated.dto';
import { UpdateEducationDto } from 'src/api/education/dto/update-education.dto';
import { DeletedOkResponse } from 'src/api/education/dto/ok-response/deleted.dto';
import { DeletedAwardOkResponse } from 'src/api/award/dto/ok-response/deleted.dto';
import { Award, ContentItem, Education, Practice, ProfessionalInterest, Tag } from '@prisma/client';
import { CreateEducationInfoDto } from 'src/api/education/dto/create-education-info.dto';
import { InfoCreatedOkResponse } from 'src/api/education/dto/ok-response/info-created';
import { UpdateEducationInfoDto } from 'src/api/education/dto/update-education-info.dto';
import { InfoUpdatedOkResponse } from 'src/api/education/dto/ok-response/info-updated';
import { STRONG_PASSWORD } from 'test/constants/test.constants';
import { AwardOkResponse } from 'src/api/award/dto/ok-response/ok.dto';
import { GetAwardOkResponse } from 'src/api/award/dto/ok-response/get-award.dto';
import { GetAwardsOkResponse } from 'src/api/award/dto/ok-response/get-awards.dto';
import { CreatedInfoAwardOkResponse } from 'src/api/award/dto/ok-response/info-created.dto';
import { UpdatedInfoAwardOkResponse } from 'src/api/award/dto/ok-response/info-updated.dto';
import { UpdateAwardDto } from 'src/api/award/dto/update-award.dto';
import { CreateAwardDto } from 'src/api/award/dto/create-award.dto';
import { PInterestOkResponse } from 'src/api/professional-interest/dto/ok-response/ok.dto';
import { PInterestInfoOkResponse } from 'src/api/professional-interest/dto/ok-response/ok-info.dto';
import { CreateProfessionalInterestDto } from 'src/api/professional-interest/dto/create-professional-interest.dto';
import { UpdateProfessionalInterestDto } from 'src/api/professional-interest/dto/update-professional-interest.dto';
import { CreateContentItemDto } from 'src/api/content-item/dto/create-content-item.dto';
import { CreatedContentItemInfoOkResponse } from 'src/api/content-item/dto/ok-response/created-info.dto';
import { UpdatedContentItemInfoOkResponse } from 'src/api/content-item/dto/ok-response/updated-info.dto';
import { GetContentItemOkResponse } from 'src/api/content-item/dto/ok-response/get-content-item.dto';
import { UpdatedContentItemOkResponse } from 'src/api/content-item/dto/ok-response/updated.dto';
import { DeletedContentItemOkResponse } from 'src/api/content-item/dto/ok-response/deleted.dto';
import { CreatedContentItemOkResponse } from 'src/api/content-item/dto/ok-response/created.dto';
import { CreateContentItemInfoDto } from 'src/api/content-item/dto/create-content-item-info.dto';
import { UpdateContentItemInfoDto } from 'src/api/content-item/dto/update-content-item-info.dto';
import { CreateTagDto } from 'src/api/tag/dto/create-tag.dto';
import { TagOkResponse } from 'src/api/tag/dto/ok-response/ok.dto';
import { UpdateTagInfoDto } from 'src/api/tag/dto/update-tag-info';
import { CreateTagInfoDto } from 'src/api/tag/dto/create-tag-info';
import { createPractice } from './category.helper';
import { GetTagOkResponse } from 'src/api/tag/dto/ok-response/get-tag.dto';
import { GetTagsOkResponse } from 'src/api/tag/dto/ok-response/get-tags.dto';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';
import { GetTagDto } from 'src/api/tag/dto/get-tag.dto';
import { GetTagsQueryDto } from 'src/api/tag/dto/get-tags.dto';
import { TagInfoOkResponse } from 'src/api/tag/dto/ok-response/ok-info.dto';

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

export const wrongEdDataCreate = async (app, { responseVerifyBody }) => {
  const educationDTO = {
    specialty: 123,
    graduationYear: "10-2000-10",
    studyYear: "Hello world",
    qualification: {
      something: 13
    }
  }

  await request(app.getHttpServer())
    .post(`/education`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Mobile')
    .send(educationDTO)
    .expect(400);
}

export const wrongEdIdGet = async (app, { responseVerifyBody }) => {

  await request(app.getHttpServer())
    .get(`/education/9999999`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Mobile')
    .expect(404);
}

export const wrongEdIdUpdate = async (app, { responseVerifyBody }) => {
  await request(app.getHttpServer())
    .patch(`/education/9999999`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Mobile')
    .expect(404);
}

export const wrongEdIdDelete = async (app, { responseVerifyBody }) => {
  await request(app.getHttpServer())
    .delete(`/education/9999999`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Mobile')
    .expect(404);
}

export const wrongEdUser = async (app, { responseVerifyBody }, education: Education) => {
  await request(app.getHttpServer())
    .get(`/education/${education.id}`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Mobile')
    .expect(403);

  await request(app.getHttpServer())
    .patch(`/education/${education.id}`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Mobile')
    .expect(403);

  await request(app.getHttpServer())
    .delete(`/education/${education.id}`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Mobile')
    .expect(403);
}

// award

export const createAward = async (
  app, { responseVerifyBody }: fullSignUpType
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

  return responseBody
}

const getAward = async (
  app, { responseVerifyBody }: fullSignUpType,
  award: Award): Promise<GetAwardOkResponse> => {
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

  return responseBody
}

const getAwards = async (
  app, { responseVerifyBody }: fullSignUpType,
  award: Award): Promise<GetAwardsOkResponse> => {
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

  return responseBody
}

const deleteAward = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  award: Award): Promise<DeletedAwardOkResponse> => {
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

  return responseBody
}

const createAwardInfo = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  award: Award): Promise<CreatedInfoAwardOkResponse> => {
  const dto: CreateAwardDto = {
    title: "BestOfBest_1"
  }
  const response = await request(app.getHttpServer())
    .post(`/award/${award.id}/translation/en`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .send(dto)
    .expect(201);

  const responseBody: CreatedInfoAwardOkResponse = await JSON.parse(response.text);


  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('langCode');
  expect(responseBody.data).toHaveProperty('title');
  expect(responseBody.data).toHaveProperty('awardId', award.id);

  return responseBody
}

const updateAwardInfo = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  award: Award): Promise<UpdatedInfoAwardOkResponse> => {
  const dto: UpdateAwardDto = {
    title: "BestOfBest_2"
  }

  const response = await request(app.getHttpServer())
    .patch(`/award/${award.id}/translation/en`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .send(dto)
    .expect(200);

  const responseBody: UpdatedInfoAwardOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('langCode');
  expect(responseBody.data).toHaveProperty('title', dto.title);
  expect(responseBody.data).toHaveProperty('awardId', award.id);

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

export const educationCRUD = async (app, data, _) => {
  const educationRes = await createEducation(app, data)
  await getEducation(app, data, educationRes.data)

  await createEducationTransl(app, data, educationRes.data)
  await updateEducationTransl(app, data, educationRes.data)

  await updateEducation(app, data, educationRes.data)

  await deleteEducation(app, data, educationRes.data)
}

export const educationERRORS = async (app, data, _) => {
  const educationRes = await createEducation(app, data)

  const secondUserData = await fullSignUp(app, {
    email: 'anotherUser@gmail.com',
    password: STRONG_PASSWORD
  })

  await wrongEdDataCreate(app, data)
  await wrongEdIdGet(app, data)
  await wrongEdIdUpdate(app, data)
  await wrongEdIdDelete(app, data)
  await wrongEdUser(app, secondUserData, educationRes.data)
  await deleteEducation(app, data, educationRes.data)

  await deleteSelf(app, secondUserData.responseVerifyBody.data.jwtToken)
}


//avatar

export const uploadAvatar = async (app, data: fullSignUpType) => {
  const response = await request(app.getHttpServer())
    .post('/user-profile/avatar')
    .attach('file', './test/test-images/avatar.png')
    .set('Authorization', `Bearer ${data.responseVerifyBody.data.jwtToken}`);

  expect(response.status).toBe(201);
}

export const getAvatarData = async (app, data: fullSignUpType) => {
  const response = await request(app.getHttpServer())
    .get('/user-profile/avatar')
    .set('Authorization', `Bearer ${data.responseVerifyBody.data.jwtToken}`);

  expect(response.status).toBe(200);
  return response
}

export const getAvatarImage = async (app, { responseBody, responseVerifyBody }: fullSignUpType) => {
  const response = await request(app.getHttpServer())
    .get(`/photo/${responseBody.person.id}/AVATAR`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`);


  expect(response.status).toBe(200);
  expect(response.header['content-type']).toBe('application/octet-stream');
  expect(response.header['content-disposition']).toContain('attachment;');
}

export const deleteAvatar = async (app, { responseBody, responseVerifyBody }: fullSignUpType) => {
  const response = await request(app.getHttpServer())
    .get(`/photo/${responseBody.person.id}/AVATAR`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`);

  expect(response.status).toBe(200);
}

export const avatarF = async (app, data, _) => {
  await uploadAvatar(app, data)
  await getAvatarData(app, data)
  await getAvatarImage(app, data)
  await deleteAvatar(app, data)
}

export const awardsF = async (app, data: fullSignUpType, _) => {
  const awardRes = await createAward(app, data)
  await getAward(app, data, awardRes.data)
  await createAwardInfo(app, data, awardRes.data)
  await updateAwardInfo(app, data, awardRes.data)
  await deleteAward(app, data, awardRes.data)
}

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

  return responseBody
}

export const deletePI = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  PI: ProfessionalInterest) => {
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

  return responseBody
}

export const createInfoPI = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  PI: ProfessionalInterest) => {
  const dto: CreateProfessionalInterestDto = {
    title: "programming"
  }

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

  return responseBody
}

export const updateInfoPI = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  PI: ProfessionalInterest) => {
  const dto: UpdateProfessionalInterestDto = {
    title: "programming_2"
  }

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

  return responseBody
}

export const professionalInterestF = async (app, data: fullSignUpType, _) => {
  const PIRes = await createPI(app, data)
  await createInfoPI(app, data, PIRes.data)
  await updateInfoPI(app, data, PIRes.data)
  await deletePI(app, data, PIRes.data)
}

export const createContentItem = async (
  app,
  jwtToken: string
): Promise<CreatedContentItemOkResponse> => {
  const dto: CreateContentItemDto = {
    type: 'PUBLISH'
  }

  const response = await request(app.getHttpServer())
    .post(`/content-item`)
    .set('Authorization', `Bearer ${jwtToken}`)
    .set('User-Agent', 'Desktop')
    .send(dto)
    .expect(201);

  const responseBody: CreatedContentItemOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('videoLink');
  expect(responseBody.data).toHaveProperty('type');
  expect(responseBody.data).toHaveProperty('publicationDate');

  return responseBody
}

export const getContentItem = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  contentItem: ContentItem
): Promise<GetContentItemOkResponse> => {
  const response = await request(app.getHttpServer())
    .get(`/content-item/${contentItem.id}`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .expect(200);

  const responseBody: GetContentItemOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('videoLink');
  expect(responseBody.data).toHaveProperty('type');
  expect(responseBody.data).toHaveProperty('publicationDate');

  return responseBody
}

export const deleteContentItem = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  contentItem: ContentItem
): Promise<DeletedContentItemOkResponse> => {
  const response = await request(app.getHttpServer())
    .delete(`/content-item/${contentItem.id}`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .expect(200);

  const responseBody: DeletedContentItemOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('videoLink');
  expect(responseBody.data).toHaveProperty('type');
  expect(responseBody.data).toHaveProperty('publicationDate');

  return responseBody
}

export const createContentItemInfo = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  contentItem: ContentItem
): Promise<CreatedContentItemInfoOkResponse> => {
  const dto: CreateContentItemInfoDto = {
    title: 'title',
    content: 'som content',
    description: 'som description'
  }

  const response = await request(app.getHttpServer())
    .post(`/content-item/${contentItem.id}/translation/ru`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .send(dto)
    .expect(201);

  const _responseBody: CreatedContentItemInfoOkResponse = await JSON.parse(response.text);

  expect(_responseBody).toHaveProperty('message');
  expect(_responseBody).toHaveProperty('data');
  expect(_responseBody.data).toHaveProperty('id');
  expect(_responseBody.data).toHaveProperty('content', dto.content);
  expect(_responseBody.data).toHaveProperty('contentItemId', contentItem.id);
  expect(_responseBody.data).toHaveProperty('description', dto.description);
  expect(_responseBody.data).toHaveProperty('langCode');
  expect(_responseBody.data).toHaveProperty('title', dto.title);


  return _responseBody
}

export const updateContentItemInfo = async (
  app,
  { responseVerifyBody }: fullSignUpType,
  contentItem: ContentItem
): Promise<UpdatedContentItemInfoOkResponse> => {
  const dto: UpdateContentItemInfoDto = {
    title: 'title_2',
    content: 'som content_2',
    description: 'som description_2'
  }

  const response = await request(app.getHttpServer())
    .patch(`/content-item/${contentItem.id}/translation/ru`)
    .set('Authorization', `Bearer ${responseVerifyBody.data.jwtToken}`)
    .set('User-Agent', 'Desktop')
    .send(dto)
    .expect(200);

  const responseBody: UpdatedContentItemInfoOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('id');
  expect(responseBody.data).toHaveProperty('content', dto.content);
  expect(responseBody.data).toHaveProperty('contentItemId', contentItem.id);
  expect(responseBody.data).toHaveProperty('description', dto.description);
  expect(responseBody.data).toHaveProperty('langCode');
  expect(responseBody.data).toHaveProperty('title', dto.title);


  return responseBody
}


export const contentItemF = async (app, data: fullSignUpType, _) => {
  const createContentItemRes = await createContentItem(app, data.responseVerifyBody.data.jwtToken)

  try {
    await getContentItem(app, data, createContentItemRes.data)
    await createContentItemInfo(app, data, createContentItemRes.data)
    await updateContentItemInfo(app, data, createContentItemRes.data)
    await deleteContentItem(app, data, createContentItemRes.data)
  } catch (error) {
    await deleteContentItem(app, data, createContentItemRes.data)
  }

}

export const createTag = async (
  app,
  jwt: string,
  tagDTO: CreateTagDto) => {

  const response = await request(app.getHttpServer())
    .post(`/tag`)
    .set('Authorization', `Bearer ${jwt}`)
    .set('User-Agent', 'Mobile')
    .send(tagDTO)
    .expect(201);

  const responseBody: TagOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('practiceId', tagDTO.practiceId);
  expect(responseBody.data).toHaveProperty('contentItemId', tagDTO.contentItemId);
  expect(responseBody.data).toHaveProperty('newsId');

  return responseBody
}

export const getTag = async (
  app,
  jwt: string,
  tag: Tag
) => {
  const response = await request(app.getHttpServer())
    .get(`/tag/${tag.id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody: GetTagOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('newsId');
  expect(responseBody.data).toHaveProperty('TagTranslation');
}

export const getTags = async (
  app,
  jwt: string,
  pagination: GetTagsQueryDto = {
    limit: 1,
    offset: 0,
  }
) => {
  const response = await request(app.getHttpServer())
    .get(`/tag`)
    .set('Authorization', `Bearer ${jwt}`)
    .set('User-Agent', 'Mobile')
    .query(pagination)
    .expect(200);
  const responseBody: GetTagsOkResponse = await JSON.parse(response.text);
  
  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody).toHaveProperty('itemCount');
  expect(responseBody).toHaveProperty('limit', pagination.limit);
  expect(responseBody).toHaveProperty('offset', pagination.offset);
}

export const deleteTag = async (
  app,
  jwt: string,
  tag: Tag) => {
  const response = await request(app.getHttpServer())
    .delete(`/tag/${tag.id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .set('User-Agent', 'Mobile')
    .expect(200);

  const responseBody: TagOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('newsId');
}

export const createTagInfo = async (
  app,
  jwt: string,
  tag: Tag
) => {
  const tagDTO: CreateTagInfoDto = {
    tag: "tag"
  }

  const response = await request(app.getHttpServer())
    .post(`/tag/${tag.id}/translation/ru`)
    .set('Authorization', `Bearer ${jwt}`)
    .set('User-Agent', 'Mobile')
    .send(tagDTO)
    .expect(201);

  const responseBody: TagInfoOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('langCode');
  expect(responseBody.data).toHaveProperty('tag', tagDTO.tag);
  expect(responseBody.data).toHaveProperty('tagId', tag.id);

  return response
}

export const updateTagInfo = async (
  app,
  jwt: string,
  tag: Tag
) => {
  const tagDTO: CreateTagInfoDto = {
    tag: "Tag@#$!$"
  }
  const response = await request(app.getHttpServer())
    .patch(`/tag/${tag.id}/translation/ru`)
    .set('Authorization', `Bearer ${jwt}`)
    .set('User-Agent', 'Mobile')
    .send(tagDTO)
    .expect(200);

  const responseBody: TagInfoOkResponse = await JSON.parse(response.text);

  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('data');
  expect(responseBody.data).toHaveProperty('langCode');
  expect(responseBody.data).toHaveProperty('tag', tagDTO.tag);
  expect(responseBody.data).toHaveProperty('tagId', tag.id);
  return response
}

export const tagF = async (app, _: null, mockUser, adminData: signUpAdminType) => {
  const { responseBody } = adminData
  const practice = await createPractice(app, responseBody)
  const contentItem = await createContentItem(app, adminData.responseBody.jwtToken)
  const createTagRes = await createTag(app, responseBody.jwtToken, {
    practiceId: practice.data.id,
    contentItemId: contentItem.data.id
  })
  await createTagInfo(app, responseBody.jwtToken, createTagRes.data)
  await updateTagInfo(app, responseBody.jwtToken, createTagRes.data)

  await getTag(app, responseBody.jwtToken, createTagRes.data)
  await getTags(app, responseBody.jwtToken, {
    limit: 1,
    offset: 0,
    practiceId: practice.data.id
  })
  await deleteTag(app, responseBody.jwtToken, createTagRes.data)
}