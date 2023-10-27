import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { USER_EXAMPLES_WITH_TRANSLATION, UserReturnType } from '../../constants/user.constants';
import { PaginationDto } from 'src/common/dto/ok-pagination.dto';

export class GetUsersOkResponse extends PaginationDto{
  @ApiProperty({
    example: USER_EXAMPLES_WITH_TRANSLATION,
  })
  users: UserReturnType[];
}
