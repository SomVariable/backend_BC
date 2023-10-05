import { ApiProperty } from '@nestjs/swagger';
import { Offer_EXAMPLES, Offer_OK } from '../../constants/offer.constants';
import { Service } from '@prisma/client';

export class OfferOkResponse {
  @ApiProperty({
    type: Offer_OK,
    enum: Offer_OK,
  })
  message: Offer_OK;
}
