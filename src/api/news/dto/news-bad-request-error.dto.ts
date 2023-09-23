import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from 'src/common/dto/errors.dto';
import { NEWS_BAD_REQUEST } from '../constants/news.constants';

export class NewsBadRequestErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: NEWS_BAD_REQUEST,
    enum: NEWS_BAD_REQUEST,
  })
  message: string;
}
