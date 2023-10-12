import * as request from 'supertest';
import { fullSignUpType } from 'test/types/test.types';

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




