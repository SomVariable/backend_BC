import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from 'src/common/dto/errors.dto';
import { AWARD_NOT_FOUND } from '../constants/award.constants';

export class AwardNotFoundErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: AWARD_NOT_FOUND,
    enum: AWARD_NOT_FOUND,
  })
  message: string;
}
