import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from 'src/common/dto/errors.dto';
import { CONTENT_ITEM_NOT_FOUND } from '../constants/content-item.constants';

export class ContentItemNotFoundErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: CONTENT_ITEM_NOT_FOUND,
    enum: CONTENT_ITEM_NOT_FOUND,
  })
  message: string;
}
