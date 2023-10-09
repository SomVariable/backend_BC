import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export class QueryPaginationParam {
  @ApiPropertyOptional()
  @Type(() => Number)
  @Max(100)
  @IsOptional()
  limit: number = 10;

  @ApiPropertyOptional()
  @Type(() => Number)
  @Min(0)
  @IsOptional()
  offset: number = 0;
}
