import { ApiProperty } from '@nestjs/swagger';
import { AUTH_OK, SIGN_UP_EXAMPLE } from '../../constants/auth.constants';
import { UserResponse } from 'src/api/user/dto/user-response.dto';
import { AuthOkResponse } from './ok.dto';
import { JWT_EXAMPLE } from 'src/api/jwt-helper/constants/jwt-helper.constants';

export class FirstUserOkResponse extends AuthOkResponse {
  @ApiProperty({
    type: AUTH_OK.SIGN_UP,
    default: AUTH_OK.SIGN_UP,
    enum: AUTH_OK,
  })
  message: AUTH_OK.SIGN_UP;

  @ApiProperty({ example: SIGN_UP_EXAMPLE })
  user: UserResponse;

  @ApiProperty({ example: JWT_EXAMPLE })
  jwtToken: string;

  @ApiProperty({ example: JWT_EXAMPLE })
  refreshToken: string
}
