import { Education } from '@prisma/client';
import { CreateEducationInfoDto } from 'src/api/education/dto/create-education-info.dto';
import { CreateEducationDto } from 'src/api/education/dto/create-education.dto';
import { CreatedOkResponse } from 'src/api/education/dto/ok-response/created.dto';
import { InfoCreatedOkResponse } from 'src/api/education/dto/ok-response/info-created';
import { InfoUpdatedOkResponse } from 'src/api/education/dto/ok-response/info-updated';
import { UpdateEducationInfoDto } from 'src/api/education/dto/update-education-info.dto';
import { UpdateEducationDto } from 'src/api/education/dto/update-education.dto';
import { DeletedOkResponse } from 'src/api/user/dto/ok-response/deleted.dto';
import { UpdatedOkResponse } from 'src/api/user/dto/ok-response/updated.dto';
import * as request from 'supertest';
import { fullSignUpType } from 'test/types/test.types';
import { fullSignUp } from './auth.helper';
import { STRONG_PASSWORD } from 'test/constants/test.constants';
import { deleteSelf } from './user.helper';

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