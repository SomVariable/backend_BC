import { ApiProperty } from '@nestjs/swagger';
import {
  EDUCATION_INFO_EXAMPLES,
  EDUCATION_OK,
} from '../../constants/education.constants';
import { EducationTranslation } from '@prisma/client';

export class InfoCreatedOkResponse {
  @ApiProperty({
    type: EDUCATION_OK.INFO_CREATED,
    default: EDUCATION_OK.INFO_CREATED,
    enum: EDUCATION_OK,
  })
  message: EDUCATION_OK.INFO_CREATED;

  @ApiProperty({
    example: EDUCATION_INFO_EXAMPLES,
  })
  data: EducationTranslation;
}
