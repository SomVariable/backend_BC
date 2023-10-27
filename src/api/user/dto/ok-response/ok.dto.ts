import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { USER_OK, USER_EXAMPLES } from '../../constants/user.constants';

export class UserOkResponse {
  @ApiProperty({
    type: USER_OK.OK,
    enum: USER_OK,
  })
  message: USER_OK;

  @ApiProperty({
    example: USER_EXAMPLES,
  })
  data: any;
}
