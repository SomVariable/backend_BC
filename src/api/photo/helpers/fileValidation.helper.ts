
import { FileTypeValidator, FileTypeValidatorOptions, FileValidator, HttpStatus, MaxFileSizeValidator, ParseFilePipe, ParseFilePipeBuilder } from "@nestjs/common";
import { IMAGE_FILE_FORMAT } from "../constants/photo.constants";

export const validateFile = {
    validators: [
        new MaxFileSizeValidator({ maxSize: 500000 }),
        new FileTypeValidator({ fileType: IMAGE_FILE_FORMAT }),
    ],
}


