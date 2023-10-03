import { ApiProperty } from '@nestjs/swagger';
import { AwardOkResponse } from './ok.dto';
import { AWARD_OK, AWARD_WITH_TRANSLATION } from '../../constants/award.constants';
import { Award } from '@prisma/client';

export class CreatedAwardOkResponse extends AwardOkResponse {
  @ApiProperty({
    type: AWARD_OK.CREATED,
    default: AWARD_OK.CREATED,
    enum: AWARD_OK,
  })
  message: AWARD_OK.CREATED;

  @ApiProperty({
    example: AWARD_WITH_TRANSLATION,
  })
  data: Award;
}
