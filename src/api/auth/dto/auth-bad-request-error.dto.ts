import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from 'src/common/dto/errors.dto';
import { AUTH_BAD_REQUEST } from '../constants/auth.constants';

export class AuthBadRequestErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: AUTH_BAD_REQUEST,
    enum: AUTH_BAD_REQUEST,
  })
  message: AUTH_BAD_REQUEST;
}
