import { ApiProperty } from '@nestjs/swagger';
import { USER_EXAMPLES_WITH_TRANSLATION } from '../../constants/user.constants';
import { PartnerProfile } from '@prisma/client';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';

export class GetUsersByPartnerCategoryOkResponse extends QueryPaginationParam {
  @ApiProperty({
    example: USER_EXAMPLES_WITH_TRANSLATION,
  })
  data: PartnerProfile[];
}
