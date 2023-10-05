import { ApiProperty } from '@nestjs/swagger';
import { OfferOkResponse } from './ok.dto';
import { Offer_EXAMPLES, Offer_OK, ServiceWithFullData } from '../../constants/offer.constants';
import { Service } from '@prisma/client';

export class UpdatedOfferOkResponse extends OfferOkResponse {
  @ApiProperty({
    type: Offer_OK.UPDATED,
    default: Offer_OK.UPDATED,
    enum: Offer_OK,
  })
  message: Offer_OK.UPDATED;

  @ApiProperty({
    example: Offer_EXAMPLES,
  })
  data: ServiceWithFullData;
}
