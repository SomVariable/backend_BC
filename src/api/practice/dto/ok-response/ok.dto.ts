import { ApiProperty } from '@nestjs/swagger';
import { PRACTICE_OK } from '../../constants/practice.constants';

export class PracticeOkResponse {
  @ApiProperty({
    type: PRACTICE_OK,
    enum: PRACTICE_OK,
  })
  message: PRACTICE_OK;
}
