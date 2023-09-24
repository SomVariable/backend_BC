import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from '../../../common/dto/errors.dto';
import { AREA_NOT_FOUND } from '../constants/area.constants';

export class AreaNotFoundErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: AREA_NOT_FOUND,
    enum: AREA_NOT_FOUND,
  })
  message: string;
}
