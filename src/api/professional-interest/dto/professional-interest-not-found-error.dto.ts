import { ApiProperty } from "@nestjs/swagger";
import { AppErrorResponse } from "src/common/dto/errors.dto";
import { P_INTEREST_NOT_FOUND } from "../constants/professional-interest.constants";

export class PInterestNotFoundErrorResponse extends AppErrorResponse {
    @ApiProperty({
        type: P_INTEREST_NOT_FOUND,
        enum: P_INTEREST_NOT_FOUND
    })
    message: string;
  }