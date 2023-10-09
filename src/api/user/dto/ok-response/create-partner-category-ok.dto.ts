import { ApiProperty } from '@nestjs/swagger';
import { CATEGORY_EXAMPLE, PARTNER_CATEGORY_EXAMPLE, USER_EXAMPLES_WITH_TRANSLATION } from '../../constants/user.constants';
import { EmployeeProfile, PartnerProfile, PracticeManagerProfile } from '@prisma/client';

export class CreatePartnerOkResponse {
  @ApiProperty({
    example: PARTNER_CATEGORY_EXAMPLE,
  })
  data: PartnerProfile;
}