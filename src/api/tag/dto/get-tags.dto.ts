import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';

export class GetTagsQueryDto extends QueryPaginationParam {
  @ApiPropertyOptional()
  @Type(() => Number)
  practiceId?: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  newsId?: number;
}

