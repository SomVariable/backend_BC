import { ApiProperty } from '@nestjs/swagger';
import { AwardOkResponse } from './ok.dto';
import { AWARD_OK } from '../../constants/award.constants';

export class CreatedOkResponse extends AwardOkResponse {
  @ApiProperty({
    type: AWARD_OK.CREATED,
    default: AWARD_OK.CREATED,
    enum: AWARD_OK,
  })
  message: AWARD_OK.CREATED;
}
