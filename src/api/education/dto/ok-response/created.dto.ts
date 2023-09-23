import { ApiProperty } from '@nestjs/swagger';
import {
  EDUCATION_EXAMPLES,
  EDUCATION_OK,
} from '../../constants/education.constants';

export class CreatedOkResponse {
  @ApiProperty({
    type: EDUCATION_OK.CREATED,
    default: EDUCATION_OK.CREATED,
    enum: EDUCATION_OK,
  })
  message: EDUCATION_OK.CREATED;

  @ApiProperty({
    example: EDUCATION_EXAMPLES,
  })
  data: any;
}
