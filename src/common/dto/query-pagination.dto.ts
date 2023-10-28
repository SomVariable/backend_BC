import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, Max, Min, Validate } from 'class-validator';
import { MAX_LIMIT } from '../constants/app.constants';

export class QueryPaginationParam {
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @Transform(({ value }) => {
    if (value > MAX_LIMIT) {
      return MAX_LIMIT;
    } 
    return value
  })
  limit? = 10;

  @ApiPropertyOptional()
  @Type(() => Number)
  @Min(0)
  @IsOptional()
  offset? = 0;
}
