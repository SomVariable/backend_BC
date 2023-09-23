import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from 'src/common/dto/errors.dto';
import { EDUCATION_NOT_FOUND } from '../constants/education.constants';

export class EducationNotFoundErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: EDUCATION_NOT_FOUND,
    enum: EDUCATION_NOT_FOUND,
  })
  message: string;
}
