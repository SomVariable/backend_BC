import { ApiProperty } from '@nestjs/swagger';
import { AreaOkResponse } from './ok.dto';
import {
  AREA_EXAMPLES,
  AREA_OK,
  AreaWithFullData,
} from '../../constants/area.constants';

export class UpdatedAreaOkResponse extends AreaOkResponse {
  @ApiProperty({
    type: AREA_OK.UPDATED,
    default: AREA_OK.UPDATED,
    enum: AREA_OK,
  })
  message: AREA_OK.UPDATED;

  @ApiProperty({
    example: AREA_EXAMPLES,
  })
  data: AreaWithFullData;
}
