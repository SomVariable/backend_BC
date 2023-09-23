import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from 'src/common/dto/errors.dto';
import { VERIFICATION_BAD_REQUEST_ERRORS } from '../constants/constants';

export class VerificationBadRequestResponse extends AppErrorResponse {
  @ApiProperty({
    type: VERIFICATION_BAD_REQUEST_ERRORS,
    enum: VERIFICATION_BAD_REQUEST_ERRORS,
  })
  message: VERIFICATION_BAD_REQUEST_ERRORS;
}
