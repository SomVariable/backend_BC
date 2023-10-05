import { ApiProperty } from '@nestjs/swagger';
import { ContentItemOkResponse } from './ok.dto';
import { CONTENT_ITEM_EXAMPLES, CONTENT_ITEM_OK } from '../../constants/content-item.constants';
import { ContentItem } from '@prisma/client';

export class CreatedContentItemOkResponse extends ContentItemOkResponse {
  @ApiProperty({
    type: CONTENT_ITEM_OK.CREATED,
    default: CONTENT_ITEM_OK.CREATED,
    enum: CONTENT_ITEM_OK,
  })
  message: CONTENT_ITEM_OK.CREATED;

  @ApiProperty({
    example: CONTENT_ITEM_EXAMPLES,
  })
  data: ContentItem
}
