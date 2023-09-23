import { ApiProperty } from '@nestjs/swagger';
import { AREA_EXAMPLES } from '../../constants/area.constants';
import { Area } from '@prisma/client';

export class GetAreasOkResponse {
  @ApiProperty({
    example: [AREA_EXAMPLES, AREA_EXAMPLES, '...n'],
  })
  data: Area[];
}
