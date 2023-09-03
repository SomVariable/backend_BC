import { ApiProperty } from "@nestjs/swagger";
import { AppErrorResponse } from "src/common/dto/errors.dto";
import { AWARD_BAD_REQUEST } from "../constants/award.constants";

export class AwardBadRequestErrorResponse extends AppErrorResponse {
    @ApiProperty({
        type: AWARD_BAD_REQUEST,
        enum: AWARD_BAD_REQUEST
    })
    message: string;
  }