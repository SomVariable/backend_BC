import { ApiProperty } from '@nestjs/swagger';
import { ContentItemOkResponse } from './ok.dto';
import { CONTENT_ITEM_WITH_TRANSLATION } from '../../constants/content-item.constants';
import { ContentItem } from '@prisma/client';

export class GetContentItemsOkResponse extends ContentItemOkResponse {
  @ApiProperty({
    example: CONTENT_ITEM_WITH_TRANSLATION,
  })
  data: ContentItem[];
}
