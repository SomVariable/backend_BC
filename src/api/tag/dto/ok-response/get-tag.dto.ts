import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@prisma/client';
import { TAG_OK, TAG_EXAMPLES, TagWithTranslation, TAG_EXAMPLES_WITH_TRANSLATION } from '../../constants/tag.constants';

export class GetTagOkResponse {
  @ApiProperty({
    type: TAG_OK.OK,
    enum: TAG_OK,
  })
  message: TAG_OK.OK;

  @ApiProperty({
    example: TAG_EXAMPLES_WITH_TRANSLATION,
  })
  data: TagWithTranslation;
}
