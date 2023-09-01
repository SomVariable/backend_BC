import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, Max, Min } from "class-validator";

export class QueryPaginationParam {
  
    @ApiPropertyOptional()
    @IsNumber()
    @Max(100)
    @IsOptional()
    limit: number = 100

    @ApiPropertyOptional()
    @IsNumber()
    @Min(0)
    @IsOptional()
    offset: number = 0
    
}