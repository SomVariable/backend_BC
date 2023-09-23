import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from 'src/common/dto/errors.dto';
import { P_INTEREST_BAD_REQUEST } from '../constants/professional-interest.constants';

export class PInterestBadRequestErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: P_INTEREST_BAD_REQUEST,
    enum: P_INTEREST_BAD_REQUEST,
  })
  message: string;
}
