import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  practicesIds: number[];
}
