import { ApiProperty } from '@nestjs/swagger';
import {
  TAG_OK,
  TagWithTranslation,
  TAG_EXAMPLES_WITH_TRANSLATION,
} from '../../constants/tag.constants';
import { PaginationDto } from 'src/common/dto/ok-pagination.dto';

export class GetTagsOkResponse extends PaginationDto {
  @ApiProperty({
    type: TAG_OK.OK,
    enum: TAG_OK,
  })
  message: TAG_OK.OK;

  @ApiProperty({
    example: TAG_EXAMPLES_WITH_TRANSLATION,
  })
  data: TagWithTranslation[];
}
