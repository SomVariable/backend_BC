import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from 'src/common/dto/errors.dto';
import { TAG_NOT_FOUND } from '../constants/tag.constants';

export class TagNotFoundErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: TAG_NOT_FOUND,
    enum: TAG_NOT_FOUND,
  })
  message: string;
}
