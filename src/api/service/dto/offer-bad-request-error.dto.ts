import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from 'src/common/dto/errors.dto';
import { Offer_BAD_REQUEST } from '../constants/offer.constants';

export class OfferBadRequestErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: Offer_BAD_REQUEST,
    enum: Offer_BAD_REQUEST,
  })
  message: string;
}
