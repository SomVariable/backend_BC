import { ApiProperty } from '@nestjs/swagger';
import { USER_EXAMPLES_WITH_TRANSLATION } from '../../constants/user.constants';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';
import { UserTranslation } from '@prisma/client';

export class GetUsersByNameOkResponse extends QueryPaginationParam {
  @ApiProperty({
    example: USER_EXAMPLES_WITH_TRANSLATION,
  })
  data: UserTranslation[];
}
