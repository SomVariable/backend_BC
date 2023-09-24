import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from '../../../common/dto/errors.dto';
import { AREA_BAD_REQUEST } from '../constants/area.constants';

export class AreaBadRequestErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: AREA_BAD_REQUEST,
    enum: AREA_BAD_REQUEST,
  })
  message: string;
}
