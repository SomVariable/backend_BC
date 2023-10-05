import { ApiProperty } from '@nestjs/swagger';
import { ContentItemOkResponse } from './ok.dto';
import { CONTENT_ITEM_EXAMPLES, CONTENT_ITEM_OK } from '../../constants/content-item.constants';
import { ContentItem } from '@prisma/client';

export class DeletedContentItemOkResponse extends ContentItemOkResponse {
  @ApiProperty({
    type: CONTENT_ITEM_OK.DELETED,
    default: CONTENT_ITEM_OK.DELETED,
    enum: CONTENT_ITEM_OK,
  })
  message: CONTENT_ITEM_OK.DELETED;

  @ApiProperty({
    example: CONTENT_ITEM_EXAMPLES,
  })
  data: ContentItem
}
