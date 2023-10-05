import { ApiProperty } from '@nestjs/swagger';
import { AreaOkResponse } from './ok.dto';
import { AREA_EXAMPLES, AREA_OK } from '../../constants/area.constants';
import { Area } from '@prisma/client';

export class CreatedAreaOkResponse extends AreaOkResponse {
  @ApiProperty({
    type: AREA_OK.CREATED,
    default: AREA_OK.CREATED,
    enum: AREA_OK,
  })
  message: AREA_OK.CREATED;

  @ApiProperty({
    example: AREA_EXAMPLES,
  })
  data: Area;
}
