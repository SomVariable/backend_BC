import { ApiProperty } from '@nestjs/swagger';
import { Offer_OK } from '../../constants/offer.constants';

export class OfferOkResponse {
  @ApiProperty({
    type: Offer_OK,
    enum: Offer_OK,
  })
  message: Offer_OK;
}
