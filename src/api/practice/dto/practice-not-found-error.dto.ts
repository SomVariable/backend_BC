import { ApiProperty } from "@nestjs/swagger";
import { AppErrorResponse } from "src/common/dto/errors.dto";
import { PRACTICE_NOT_FOUND } from "../constants/practice.constants";

export class PracticeNotFoundErrorResponse extends AppErrorResponse {
    @ApiProperty({
        type: PRACTICE_NOT_FOUND,
        enum: PRACTICE_NOT_FOUND
    })
    message: string;
  }