import { ApiProperty } from '@nestjs/swagger';
import { QueryPaginationParam } from './query-pagination.dto';

export class PaginationDto implements QueryPaginationParam {
  @ApiProperty({ example: 0 })
  offset: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 100 })
  itemCount: number;
}
