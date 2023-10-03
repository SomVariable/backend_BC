import { ApiProperty } from '@nestjs/swagger';
import { Award } from '@prisma/client';
import { AWARD_EXAMPLES, AWARD_OK } from '../../constants/award.constants';

export class AwardOkResponse {
  @ApiProperty({
    type: AWARD_OK,
    enum: AWARD_OK,
  })
  message: AWARD_OK;

  @ApiProperty({
    example: AWARD_EXAMPLES,
  })
  data: any;
}
