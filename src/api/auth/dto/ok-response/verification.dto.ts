import { ApiProperty } from '@nestjs/swagger';
import {
  AUTH_OK,
  JWT_EXAMPLE,
  JwtReturnType,
} from '../../constants/auth.constants';
import { AuthOkResponse } from './ok.dto';

export class VerificationOkResponse extends AuthOkResponse {
  @ApiProperty({ example: JWT_EXAMPLE })
  data: JwtReturnType;

  @ApiProperty({
    type: AUTH_OK.SUCCESS_VERIFICATION,
    default: AUTH_OK.SUCCESS_VERIFICATION,
    enum: AUTH_OK,
  })
  message: AUTH_OK.SUCCESS_VERIFICATION;
}
