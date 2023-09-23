import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { USER_EXAMPLES_WITH_TRANSLATION } from '../../constants/user.constants';

export class GetUsersOkResponse {
  @ApiProperty({
    example: USER_EXAMPLES_WITH_TRANSLATION,
  })
  data: User;
}
