import { ApiProperty } from '@nestjs/swagger';
import {
  EDUCATION_EXAMPLES,
  EDUCATION_OK,
} from '../../constants/education.constants';
import { Education } from '@prisma/client';

export class DeletedOkResponse {
  @ApiProperty({
    type: EDUCATION_OK.DELETED,
    default: EDUCATION_OK.DELETED,
    enum: EDUCATION_OK,
  })
  message: EDUCATION_OK.DELETED;

  @ApiProperty({
    example: EDUCATION_EXAMPLES,
  })
  data: Education;
}
