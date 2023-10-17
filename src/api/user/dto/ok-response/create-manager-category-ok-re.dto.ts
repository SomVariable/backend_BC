import { ApiProperty } from '@nestjs/swagger';
import { CATEGORY_EXAMPLE } from '../../constants/user.constants';
import { PracticeManagerProfile } from '@prisma/client';

export class CreateManagerOkResponse {
  @ApiProperty({
    example: CATEGORY_EXAMPLE,
  })
  data: PracticeManagerProfile;
}
