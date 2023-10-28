import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { USER_EXAMPLES_WITH_TRANSLATION, UserReturnType } from '../../constants/user.constants';
import { PaginationDto } from 'src/common/dto/ok-pagination.dto';


class GetUsersDataType extends PaginationDto{
  @ApiProperty({
    example: USER_EXAMPLES_WITH_TRANSLATION,
  })
  users: UserReturnType[];
}

export class GetUsersOkResponse {
  @ApiProperty({
    example: USER_EXAMPLES_WITH_TRANSLATION,
  })
  data: GetUsersDataType
  
  @ApiProperty()
  message: string
}
