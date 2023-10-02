import { ApiProperty } from '@nestjs/swagger';
import {
  EDUCATION_EXAMPLES,
  EDUCATION_OK,
} from '../../constants/education.constants';
import { Education } from '@prisma/client';

export class UpdatedOkResponse {
  @ApiProperty({
    type: EDUCATION_OK.UPDATED,
    default: EDUCATION_OK.UPDATED,
    enum: EDUCATION_OK,
  })
  message: EDUCATION_OK.UPDATED;

  @ApiProperty({
    example: EDUCATION_EXAMPLES,
  })
  data: Education;
}
