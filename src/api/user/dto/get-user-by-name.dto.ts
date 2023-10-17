import { ApiPropertyOptional } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';

export class GetUserProfileByNameDto extends QueryPaginationParam {
  @ApiPropertyOptional()
  @Length(1, 90)
  name: string;
}
