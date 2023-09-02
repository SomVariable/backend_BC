import { ApiProperty } from "@nestjs/swagger";
import { AppErrorResponse } from "src/common/dto/errors.dto";
import { NEWS_NOT_FOUND } from "../constants/news.constants";

export class NewsNotFoundErrorResponse extends AppErrorResponse {
    @ApiProperty({
        type: NEWS_NOT_FOUND,
        enum: NEWS_NOT_FOUND
    })
    message: string;
  }