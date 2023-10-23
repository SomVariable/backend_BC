import { ApiProperty } from '@nestjs/swagger';
import { USER_EXAMPLES_WITH_TRANSLATION, UserReturnType } from '../../constants/user.constants';

export class GetUserOkResponse {
  @ApiProperty({
    example: USER_EXAMPLES_WITH_TRANSLATION,
  })
  data: UserReturnType;
}
