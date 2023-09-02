import { ApiProperty } from "@nestjs/swagger";
import { AppErrorResponse } from "src/common/dto/errors.dto";
import { ContentItem_NOT_FOUND } from "../constants/content-item.constants";

export class ContentItemNotFoundErrorResponse extends AppErrorResponse {
    @ApiProperty({
        type: ContentItem_NOT_FOUND,
        enum: ContentItem_NOT_FOUND
    })
    message: string;
  }