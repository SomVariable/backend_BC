import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class GetTagDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  practiceId?: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  newsId?: number;
}
