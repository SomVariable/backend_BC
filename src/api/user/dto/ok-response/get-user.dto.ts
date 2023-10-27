import { ApiProperty } from '@nestjs/swagger';
import { USER_EXAMPLES_WITH_TRANSLATION, UserReturnType, UserReturnTypeWithProfile } from '../../constants/user.constants';

export class GetUserOkResponse {
  @ApiProperty({
    example: USER_EXAMPLES_WITH_TRANSLATION,
  })
  data: UserReturnTypeWithProfile;
}
