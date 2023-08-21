import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, Max, Min } from "class-validator";

export class QueryPaginationParam {
  
    @ApiPropertyOptional()
    @IsNumber()
    @IsPositive()
    @Max(100)
    @IsOptional()
    limit = 100

    @ApiPropertyOptional()
    @IsNumber()
    @IsPositive()
    @Min(0)
    @IsOptional()
    offset = 0
}