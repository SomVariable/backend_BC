import { ApiProperty } from '@nestjs/swagger';
import { AUTH_OK, JWT_EXAMPLE } from '../../constants/auth.constants';
import { AuthOkResponse } from './ok.dto';

export class RefreshTokensOkResponse extends AuthOkResponse {
  @ApiProperty({
    type: AUTH_OK.REFRESH_TOKEN,
    default: AUTH_OK.REFRESH_TOKEN,
    enum: AUTH_OK,
  })
  message: AUTH_OK.REFRESH_TOKEN;

  @ApiProperty({
    example: JWT_EXAMPLE,
  })
  data: any;
}
