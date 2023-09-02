import { ApiProperty } from "@nestjs/swagger";
import { AppErrorResponse } from "src/common/dto/errors.dto";
import { ContentItem_BAD_REQUEST } from "../constants/content-item.constants";

export class ContentItemBadRequestErrorResponse extends AppErrorResponse {
    @ApiProperty({
        type: ContentItem_BAD_REQUEST,
        enum: ContentItem_BAD_REQUEST
    })
    message: string;
  }