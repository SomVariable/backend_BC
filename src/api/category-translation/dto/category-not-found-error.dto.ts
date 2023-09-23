import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from 'src/common/dto/errors.dto';
import { CATEGORY_INFO_NOT_FOUND } from '../constants/category.constants';

export class CategoryTranslationNotFoundErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: CATEGORY_INFO_NOT_FOUND,
    enum: CATEGORY_INFO_NOT_FOUND,
  })
  message: string;
}
