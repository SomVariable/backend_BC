import { ApiProperty } from '@nestjs/swagger';
import { AreaOkResponse } from './ok.dto';
import { AREA_OK } from '../../constants/area.constants';

export class DeletedOkResponse extends AreaOkResponse {
  @ApiProperty({
    type: AREA_OK.DELETED,
    default: AREA_OK.DELETED,
    enum: AREA_OK,
  })
  message: AREA_OK.DELETED;
}
