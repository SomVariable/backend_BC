import { ApiProperty } from "@nestjs/swagger";
import { AppErrorResponse } from "src/common/dto/errors.dto";
import { EDUCATION_BAD_REQUEST, EDUCATION_BAD_REQUEST_WITH_APP_ERRORS } from "../constants/education.constants";

export class EducationBadRequestErrorResponse extends AppErrorResponse {
    @ApiProperty({
        type: EDUCATION_BAD_REQUEST_WITH_APP_ERRORS,
        enum: EDUCATION_BAD_REQUEST
    })
    message: string;
  }