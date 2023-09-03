export enum Offer_OK {
    CREATED = 'the offer has been successfully established',
    UPDATED = 'the offer has been successfully update',
    DELETED = 'the offer has been successfully deleted'
}

export enum Offer_BAD_REQUEST {

}

export enum Offer_NOT_FOUND {
    MISSING_Offer = 'missing offer',
}

export const Offer_EXAMPLES = {
    "id": 1, 
    "created_at": "2023-08-31T13:39:36.767Z", 
    "updated_at": "2023-08-31T13:39:36.767Z"
}


export const Offer_WITH_TRANSLATION = {
    "data":{
       "id":1,
       "created_at":"2023-08-31T13:39:36.767Z",
       "updated_at":"2023-08-31T13:39:36.767Z",
       "CategoryTranslation":[
          {
             "id":1,
             "langCode":"ru",
             "categoryTranslationType":"SERVICE",
             "title":"test",
             "text":"test",
             "areaId":1,
             "practiceId":null,
             "serviceId":null
          },
          {
             "id":2,
             "langCode":"en",
             "categoryTranslationType":"SERVICE",
             "title":"test",
             "text":"test",
             "areaId":1,
             "practiceId":null,
             "serviceId":null
          }
       ]
    }
 }