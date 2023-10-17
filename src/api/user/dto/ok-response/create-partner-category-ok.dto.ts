import { ApiProperty } from '@nestjs/swagger';
import { PARTNER_CATEGORY_EXAMPLE } from '../../constants/user.constants';
import { PartnerProfile } from '@prisma/client';

export class CreatePartnerOkResponse {
  @ApiProperty({
    example: PARTNER_CATEGORY_EXAMPLE,
  })
  data: PartnerProfile;
}
