import { ApiProperty } from "@nestjs/swagger";
import { AppErrorResponse } from "src/common/dto/errors.dto";
import { EDUCATION_BAD_REQUEST } from "../constants/education.constants";

export class EducationBadRequestErrorResponse extends AppErrorResponse {
    @ApiProperty({
        type: EDUCATION_BAD_REQUEST,
        enum: EDUCATION_BAD_REQUEST
    })
    message: string;
  }