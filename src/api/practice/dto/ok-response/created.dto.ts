import { ApiProperty } from '@nestjs/swagger';
import { PracticeOkResponse } from './ok.dto';
import { PRACTICE_EXAMPLES, PRACTICE_OK } from '../../constants/practice.constants';
import { Practice } from '@prisma/client';

export class CreatedPracticeOkResponse extends PracticeOkResponse {
  @ApiProperty({
    type: PRACTICE_OK.CREATED,
    default: PRACTICE_OK.CREATED,
    enum: PRACTICE_OK,
  })
  message: PRACTICE_OK.CREATED;

  @ApiProperty({
    example: PRACTICE_EXAMPLES,
  })
  data: Practice;
}
