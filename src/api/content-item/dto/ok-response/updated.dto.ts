import { ApiProperty } from '@nestjs/swagger';
import { ContentItemOkResponse } from './ok.dto';
import { CONTENT_ITEM_OK } from '../../constants/content-item.constants';

export class CreatedOkResponse extends ContentItemOkResponse {
  @ApiProperty({
    type: CONTENT_ITEM_OK.UPDATED,
    default: CONTENT_ITEM_OK.UPDATED,
    enum: CONTENT_ITEM_OK,
  })
  message: CONTENT_ITEM_OK.UPDATED;
}
