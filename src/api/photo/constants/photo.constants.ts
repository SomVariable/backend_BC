import { ApiBodyOptions } from "@nestjs/swagger"
import { CreatePhotoBodyDto } from "../dto/create-photo.dto"

export enum PHOTO_OK {
    OK = "OK",
    SUCCESS_CREATION = 'news has been created'
}

export enum PHOTO_BAD_REQUEST {
  WRONG_FORMAT = 'only jpg|jpeg|png file allows'
}

export enum PHOTO_NOT_FOUND {
    MISSING_PHOTO_INFO = 'missing image-info',

}

export const PHOTO_EXAMPLES = ""


export const PHOTO_TYPE_PATH = ":photoType"
export const IMAGE_FILE_FORMAT = /(image\/jpeg|image\/png)$/
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
