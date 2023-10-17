import { ApiProperty } from '@nestjs/swagger';
import { AREA_OK } from '../../constants/area.constants';

export class AreaOkResponse {
  @ApiProperty({
    type: AREA_OK,
    enum: AREA_OK,
  })
  message: AREA_OK;
}
