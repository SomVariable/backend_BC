import { ApiProperty } from '@nestjs/swagger';
import { AUTH_OK } from '../../constants/auth.constants';

export class ResendVerificationOkResponse {
  @ApiProperty({
    type: AUTH_OK.SEND_VERIFICATION_KEY,
    default: AUTH_OK.SEND_VERIFICATION_KEY,
    enum: AUTH_OK,
  })
  message: AUTH_OK.SEND_VERIFICATION_KEY;
}
