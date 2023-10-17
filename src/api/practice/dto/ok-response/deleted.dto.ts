import { ApiProperty } from '@nestjs/swagger';
import { PracticeOkResponse } from './ok.dto';
import {
  PRACTICE_EXAMPLES,
  PRACTICE_OK,
} from '../../constants/practice.constants';
import { Practice } from '@prisma/client';

export class DeletedPracticeOkResponse extends PracticeOkResponse {
  @ApiProperty({
    type: PRACTICE_OK.DELETED,
    default: PRACTICE_OK.DELETED,
    enum: PRACTICE_OK,
  })
  message: PRACTICE_OK.DELETED;

  @ApiProperty({
    example: PRACTICE_EXAMPLES,
  })
  data: Practice;
}
