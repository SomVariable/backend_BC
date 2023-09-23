import { ApiProperty } from '@nestjs/swagger';
import { USER_EXAMPLES_WITH_TRANSLATION } from '../../constants/user.constants';

export class GetUserOkResponse {
  @ApiProperty({
    example: USER_EXAMPLES_WITH_TRANSLATION,
  })
  user: any;
}
