import { ApiProperty } from '@nestjs/swagger';
import { AppErrorResponse } from 'src/common/dto/errors.dto';
import { Offer_NOT_FOUND } from '../constants/offer.constants';

export class OfferNotFoundErrorResponse extends AppErrorResponse {
  @ApiProperty({
    type: Offer_NOT_FOUND,
    enum: Offer_NOT_FOUND,
  })
  message: string;
}
