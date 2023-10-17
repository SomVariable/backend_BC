import { ApiProperty } from '@nestjs/swagger';
import { PracticeOkResponse } from './ok.dto';
import {
  PRACTICE_EXAMPLES,
  PRACTICE_OK,
  PracticeWithFullData,
} from '../../constants/practice.constants';

export class UpdatedPracticeOkResponse extends PracticeOkResponse {
  @ApiProperty({
    type: PRACTICE_OK.UPDATED,
    default: PRACTICE_OK.UPDATED,
    enum: PRACTICE_OK,
  })
  message: PRACTICE_OK.UPDATED;

  @ApiProperty({
    example: PRACTICE_EXAMPLES,
  })
  data: PracticeWithFullData;
}
