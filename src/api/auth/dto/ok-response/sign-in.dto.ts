import { ApiProperty } from '@nestjs/swagger';
import { AUTH_OK, SIGN_UP_EXAMPLE } from '../../constants/auth.constants';
import { AuthOkResponse } from './ok.dto';

export class SignINOkResponse extends AuthOkResponse {
  @ApiProperty({
    type: AUTH_OK.SIGN_IN,
    default: AUTH_OK.SIGN_UP,
    enum: AUTH_OK,
  })
  message: AUTH_OK.SIGN_IN;

  @ApiProperty({ example: SIGN_UP_EXAMPLE })
  person: any;
}
