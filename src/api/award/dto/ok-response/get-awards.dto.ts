import { ApiProperty } from '@nestjs/swagger';
import { Award } from '@prisma/client';
import { AWARD_WITH_TRANSLATION } from '../../constants/award.constants';
import { AwardOkResponse } from './ok.dto';

export class GetAwardsOkResponse extends AwardOkResponse {
  @ApiProperty({
    example: [AWARD_WITH_TRANSLATION, AWARD_WITH_TRANSLATION, '...n'],
  })
  data: Award[];
}
