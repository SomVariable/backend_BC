import { ApiProperty } from '@nestjs/swagger';
import { AREA_EXAMPLES, AREA_OK } from '../../constants/area.constants';
import { Area } from '@prisma/client';

export class AreaOkResponse {
  @ApiProperty({
    type: AREA_OK,
    enum: AREA_OK,
  })
  message: AREA_OK;

  @ApiProperty({
    example: AREA_EXAMPLES,
  })
  data: Area;
}
