import { ApiProperty } from '@nestjs/swagger';
import { USER_EXAMPLES_WITH_TRANSLATION } from '../../constants/user.constants';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';
import { PracticeManagerProfile } from '@prisma/client';

export class GetUsersByCategoryOkResponse extends QueryPaginationParam{
  @ApiProperty({
    example: USER_EXAMPLES_WITH_TRANSLATION,
  })
  data: PracticeManagerProfile[];
}
