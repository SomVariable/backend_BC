import { Prisma } from "@prisma/client"

export const ContentItemIncludeTranslation: Prisma.ContentItemInclude = {
    ContentItemTranslation: {
        include: {contentItem: true}
    }
}

export enum ContentItem_OK {
    CREATED = 'the content-item has been successfully established',
    UPDATED = 'the content-item has been successfully update',
    DELETED = 'the content-item has been successfully deleted',
    CREATED_INFO = 'the content-item-info has been successfully established',
    UPDATED_INFO = 'the content-item-info has been successfully update',
}

export enum ContentItem_BAD_REQUEST {

}

export enum ContentItem_NOT_FOUND {
    MISSING_ContentItem = 'missing content-item',
}

export const ContentItem_EXAMPLES = {
    "id": 1, 
    "created_at": "2023-08-31T13:39:36.767Z", 
    "updated_at": "2023-08-31T13:39:36.767Z"
}


export const ContentItem_WITH_TRANSLATION = {
    "data":{
       "id":1,
       "created_at":"2023-08-31T13:39:36.767Z",
       "updated_at":"2023-08-31T13:39:36.767Z",
       "CategoryTranslation":[
          {
             "id":1,
             "langCode":"ru",
             "categoryTranslationType":"AREA",
             "title":"test",
             "text":"test",
             "areaId":1,
             "practiceId":null,
             "serviceId":null
          },
          {
             "id":2,
             "langCode":"en",
             "categoryTranslationType":"AREA",
             "title":"test",
             "text":"test",
             "areaId":1,
             "practiceId":null,
             "serviceId":null
          }
       ]
    }
 }