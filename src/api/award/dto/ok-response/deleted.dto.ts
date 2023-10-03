import { ApiProperty } from '@nestjs/swagger';
import { AwardOkResponse } from './ok.dto';
import { AWARD_OK } from '../../constants/award.constants';

export class DeletedAwardOkResponse extends AwardOkResponse {
  @ApiProperty({
    type: AWARD_OK.DELETED,
    default: AWARD_OK.DELETED,
    enum: AWARD_OK,
  })
  message: AWARD_OK.CREATED;
}
