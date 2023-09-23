import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from 'src/common/dto/errors.dto';
import { PRACTICE_BAD_REQUEST } from '../constants/practice.constants';

export class PracticeBadRequestErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: PRACTICE_BAD_REQUEST,
    enum: PRACTICE_BAD_REQUEST,
  })
  message: string;
}
