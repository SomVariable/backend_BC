import { ApiProperty } from '@nestjs/swagger';
import { AREA_WITH_TRANSLATION } from '../../constants/area.constants';
import { Area } from '@prisma/client';

export class GetAreaOkResponse {
  @ApiProperty({
    example: AREA_WITH_TRANSLATION,
  })
  data: Area;
}
