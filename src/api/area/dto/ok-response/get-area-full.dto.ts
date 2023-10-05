import { ApiProperty } from '@nestjs/swagger';
import { AREA_WITH_TRANSLATION, AreaWithFullData } from '../../constants/area.constants';
import { Area } from '@prisma/client';

export class GetAreaFullOkResponse {
  @ApiProperty({
    example: AREA_WITH_TRANSLATION,
  })
  data: AreaWithFullData;
}
