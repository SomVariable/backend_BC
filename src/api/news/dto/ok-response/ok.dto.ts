import { ApiProperty } from '@nestjs/swagger';
import { News } from '@prisma/client';
import { NEWS_EXAMPLES, NEWS_OK } from '../../constants/news.constants';

export class NewsOkResponse {
  @ApiProperty({
    type: NEWS_OK.OK,
    default: NEWS_OK.OK,
    enum: NEWS_OK,
  })
  message: NEWS_OK.OK;

  @ApiProperty({
    example: NEWS_EXAMPLES,
  })
  data: News;
}
