import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CreatePracticeDto {
  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  areasIds: number[] = [];

  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  servicesIds: number[] = [];
}
