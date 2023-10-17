import { ApiProperty } from '@nestjs/swagger';
import {
  TAG_OK,
  TAG_EXAMPLES_WITH_TRANSLATION,
  TagWithFullData,
} from '../../constants/tag.constants';

export class GetLatestTagsOkResponse {
  @ApiProperty({
    type: TAG_OK.OK,
    enum: TAG_OK,
  })
  message: TAG_OK.OK;

  @ApiProperty({
    example: TAG_EXAMPLES_WITH_TRANSLATION,
  })
  data: TagWithFullData[];
}
