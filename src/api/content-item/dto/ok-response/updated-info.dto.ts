import { ApiProperty } from '@nestjs/swagger';
import { ContentItemOkResponse } from './ok.dto';
import { CONTENT_ITEM_EXAMPLES, CONTENT_ITEM_OK, CONTENT_ITEM_TRANSLATION } from '../../constants/content-item.constants';
import { ContentItemTranslation } from '@prisma/client';

export class UpdatedContentItemInfoOkResponse extends ContentItemOkResponse {
  @ApiProperty({
    type: CONTENT_ITEM_OK.UPDATED_INFO,
    default: CONTENT_ITEM_OK.UPDATED_INFO,
    enum: CONTENT_ITEM_OK,
  })
  message: CONTENT_ITEM_OK.UPDATED_INFO;
  
  
  @ApiProperty({
    example: CONTENT_ITEM_TRANSLATION,
  })
  data: ContentItemTranslation
}
