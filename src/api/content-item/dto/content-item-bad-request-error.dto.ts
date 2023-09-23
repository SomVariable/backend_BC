import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from 'src/common/dto/errors.dto';
import { CONTENT_ITEM_BAD_REQUEST } from '../constants/content-item.constants';

export class ContentItemBadRequestErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: CONTENT_ITEM_BAD_REQUEST,
    enum: CONTENT_ITEM_BAD_REQUEST,
  })
  message: string;
}
