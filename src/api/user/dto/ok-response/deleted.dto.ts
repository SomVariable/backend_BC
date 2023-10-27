import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { USER_OK, USER_EXAMPLES, UserReturnType } from '../../constants/user.constants';
import { UserOkResponse } from './ok.dto';

export class DeletedOkResponse extends UserOkResponse {
  @ApiProperty({
    type: USER_OK.DELETED,
    enum: USER_OK,
  })
  message: USER_OK.DELETED;

  @ApiProperty({
    example: USER_EXAMPLES,
  })
  data: UserReturnType;
}
