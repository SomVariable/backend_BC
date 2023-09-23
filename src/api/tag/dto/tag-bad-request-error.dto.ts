import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from 'src/common/dto/errors.dto';
import { TAG_BAD_REQUEST } from '../constants/tag.constants';

export class TagBadRequestErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: TAG_BAD_REQUEST,
    enum: TAG_BAD_REQUEST,
  })
  message: string;
}
