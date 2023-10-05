import { ApiProperty } from '@nestjs/swagger';
import { AreaOkResponse } from './ok.dto';
import { AREA_EXAMPLES, AREA_OK } from '../../constants/area.constants';
import { Area } from '@prisma/client';

export class DeletedAreaOkResponse extends AreaOkResponse {
  @ApiProperty({
    type: AREA_OK.DELETED,
    default: AREA_OK.DELETED,
    enum: AREA_OK,
  })
  message: AREA_OK.DELETED;

  @ApiProperty({
    example: AREA_EXAMPLES,
  })
  data: Area;
}
