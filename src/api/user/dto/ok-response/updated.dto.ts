import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { USER_OK, USER_EXAMPLES } from '../../constants/user.constants';
import { UserOkResponse } from './ok.dto';

export class UpdatedOkResponse extends UserOkResponse {
  @ApiProperty({
    type: USER_OK.UPDATED,
    enum: USER_OK,
  })
  message: USER_OK.UPDATED;

  @ApiProperty({
    example: USER_EXAMPLES,
  })
  data: User;
}
