import { ApiProperty } from '@nestjs/swagger';
import { ProfessionalInterest, ProfessionalInterestTranslation } from '@prisma/client';
import {
  P_INTEREST_OK,
  P_INTEREST_EXAMPLES,
} from '../../constants/professional-interest.constants';

export class PInterestInfoOkResponse {
  @ApiProperty({
    type: P_INTEREST_OK.OK,
    default: P_INTEREST_OK.OK,
    enum: P_INTEREST_OK,
  })
  message: P_INTEREST_OK.OK;

  @ApiProperty({
    example: P_INTEREST_EXAMPLES,
  })
  data: ProfessionalInterestTranslation;
}
