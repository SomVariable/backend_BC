import { ContentItem, Tag } from "@prisma/client";
import { CreateContentItemInfoDto } from "src/api/content-item/dto/create-content-item-info.dto";
import { CreateContentItemDto } from "src/api/content-item/dto/create-content-item.dto";
import { CreatedContentItemInfoOkResponse } from "src/api/content-item/dto/ok-response/created-info.dto";
import { CreatedContentItemOkResponse } from "src/api/content-item/dto/ok-response/created.dto";
import { DeletedContentItemOkResponse } from "src/api/content-item/dto/ok-response/deleted.dto";
import { GetContentItemOkResponse } from "src/api/content-item/dto/ok-response/get-content-item.dto";
import { UpdatedContentItemInfoOkResponse } from "src/api/content-item/dto/ok-response/updated-info.dto";
import { UpdateContentItemInfoDto } from "src/api/content-item/dto/update-content-item-info.dto";
import { CreateTagInfoDto } from "src/api/tag/dto/create-tag-info";
import { CreateTagDto } from "src/api/tag/dto/create-tag.dto";
import { GetTagsQueryDto } from "src/api/tag/dto/get-tags.dto";
import { GetTagOkResponse } from "src/api/tag/dto/ok-response/get-tag.dto";
import { GetTagsOkResponse } from "src/api/tag/dto/ok-response/get-tags.dto";
import { TagInfoOkResponse } from "src/api/tag/dto/ok-response/ok-info.dto";
import { TagOkResponse } from "src/api/tag/dto/ok-response/ok.dto";
import * as request from 'supertest';
import { signUpAdminType } from "test/types/test.types";
import { createPractice } from "./category.helper";
import { GetLatestTagsOkResponse } from "src/api/tag/dto/ok-response/get-latest-tags.dto";

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
    jwtToken: string,
    contentItem: ContentItem
  ): Promise<GetContentItemOkResponse> => {
    const response = await request(app.getHttpServer())
      .get(`/content-item/${contentItem.id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
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
    jwtToken: string,
    contentItem: ContentItem
  ): Promise<DeletedContentItemOkResponse> => {
    const response = await request(app.getHttpServer())
      .delete(`/content-item/${contentItem.id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
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
    jwtToken: string,
    contentItem: ContentItem
  ): Promise<CreatedContentItemInfoOkResponse> => {
    const dto: CreateContentItemInfoDto = {
      title: 'title',
      content: 'som content',
      description: 'som description'
    }
  
    const response = await request(app.getHttpServer())
      .post(`/content-item/${contentItem.id}/translation/ru`)
      .set('Authorization', `Bearer ${jwtToken}`)
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
    jwtToken: string,
    contentItem: ContentItem
  ): Promise<UpdatedContentItemInfoOkResponse> => {
    const dto: UpdateContentItemInfoDto = {
      title: 'title_2',
      content: 'som content_2',
      description: 'som description_2'
    }
  
    const response = await request(app.getHttpServer())
      .patch(`/content-item/${contentItem.id}/translation/ru`)
      .set('Authorization', `Bearer ${jwtToken}`)
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
  
  
  export const contentItemF = async (app, _, mockUser, data: signUpAdminType) => {
    const createContentItemRes = await createContentItem(app, data.responseBody.jwtToken)
  
    try {
      await getContentItem(app, data.responseBody.jwtToken, createContentItemRes.data)
      await createContentItemInfo(app, data.responseBody.jwtToken, createContentItemRes.data)
      await updateContentItemInfo(app, data.responseBody.jwtToken, createContentItemRes.data)
      await deleteContentItem(app, data.responseBody.jwtToken, createContentItemRes.data)
    } catch (error) {
      await deleteContentItem(app, data.responseBody.jwtToken, createContentItemRes.data)
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
  
  export const getLatestTags = async (app, jwtToken: string, practiceId: number, tags: Tag[]) => {
    const response = await request(app.getHttpServer())
      .get(`/tag/latest/${practiceId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .set('User-Agent', 'Mobile')
      .expect(200);
  
    const responseBody: GetLatestTagsOkResponse = await JSON.parse(response.text);
  
    expect(responseBody).toHaveProperty('message');
    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data.length).toBe(3);
  }
  
  export const tagPracticeCI_F = async (app, _: null, mockUser, adminData: signUpAdminType) => {
    const { responseBody } = adminData
    
    const practice = await createPractice(app, responseBody)
    
    const contentItem_1 = await createContentItem(app, adminData.responseBody.jwtToken)
    const contentItem_2 = await createContentItem(app, adminData.responseBody.jwtToken)
    const contentItem_3 = await createContentItem(app, adminData.responseBody.jwtToken)
    const contentItem_4 = await createContentItem(app, adminData.responseBody.jwtToken)
  
    const createTagRes_1 = await createTag(app, responseBody.jwtToken, {
      practiceId: practice.data.id,
      contentItemId: contentItem_1.data.id
    })
    const createTagRes_2 = await createTag(app, responseBody.jwtToken, {
      practiceId: practice.data.id,
      contentItemId: contentItem_2.data.id
    })
    const createTagRes_3 = await createTag(app, responseBody.jwtToken, {
      practiceId: practice.data.id,
      contentItemId: contentItem_3.data.id
    })
    const createTagRes_4 = await createTag(app, responseBody.jwtToken, {
      practiceId: practice.data.id,
      contentItemId: contentItem_4.data.id
    })
  
    const tags = [createTagRes_1.data, createTagRes_2.data, createTagRes_3.data, createTagRes_4.data]
  
    await getLatestTags(app, adminData.responseBody.jwtToken, practice.data.id, tags)
  
  }