import { ApiProperty } from '@nestjs/swagger';
import { CATEGORY_EXAMPLE, USER_EXAMPLES_WITH_TRANSLATION } from '../../constants/user.constants';
import { EmployeeProfile, PracticeManagerProfile } from '@prisma/client';

export class CreateManagerOkResponse {
  @ApiProperty({
    example: CATEGORY_EXAMPLE,
  })
  data: PracticeManagerProfile;
}
