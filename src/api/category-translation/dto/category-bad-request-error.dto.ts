import { ApiProperty } from "@nestjs/swagger";
import { AppErrorResponse } from "src/common/dto/errors.dto";
import { CATEGORY_INFO_BAD_REQUEST } from "../constants/category.constants";

export class CategoryTranslationBadRequestErrorResponse extends AppErrorResponse {
    @ApiProperty({
        type: CATEGORY_INFO_BAD_REQUEST,
        enum: CATEGORY_INFO_BAD_REQUEST
    })
    message: string;
  }