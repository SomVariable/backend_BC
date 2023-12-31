import { ApiProperty } from '@nestjs/swagger';
import { UserTranslation } from '@prisma/client';
import {
  USER_PROFILE_OK,
  USER_PROFILE_EXAMPLES,
} from '../../constants/user-profile.constants';

export class UserTranslationOkResponse {
  @ApiProperty({
    type: USER_PROFILE_OK.OK,
    enum: USER_PROFILE_OK,
  })
  message: USER_PROFILE_OK;

  @ApiProperty({
    example: USER_PROFILE_EXAMPLES,
  })
  data: UserTranslation;
}
