import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateAreaDto {
  @ApiProperty({ type: [Number] })
  @IsArray()
  practicesIds: number[];
}
