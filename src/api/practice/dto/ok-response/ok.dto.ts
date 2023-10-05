import { ApiProperty } from '@nestjs/swagger';
import {
  PRACTICE_EXAMPLES,
  PRACTICE_OK,
} from '../../constants/practice.constants';
import { Practice } from '@prisma/client';

export class PracticeOkResponse {
  @ApiProperty({
    type: PRACTICE_OK,
    enum: PRACTICE_OK,
  })
  message: PRACTICE_OK;
}
