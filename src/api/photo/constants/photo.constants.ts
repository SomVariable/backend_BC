export enum PHOTO_OK {
    OK = "OK",
    SUCCESS_CREATION = 'news has been created'
}

export enum PHOTO_BAD_REQUEST {
}

export enum PHOTO_NOT_FOUND {
    MISSING_PHOTO_INFO = 'missing news-info',

}

export const PHOTO_EXAMPLES = ""

export const PHOTO_TYPE_PATH = ":photoType"
export const IMAGE_FILE_MESSAGE = 'only image file allows'
export const IMAGE_FILE_FORMAT = /\.(jpg|jpeg|png)$/
export const API_FILE_CONFIG = {
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  }
