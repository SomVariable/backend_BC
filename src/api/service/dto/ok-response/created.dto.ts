import { ApiProperty } from '@nestjs/swagger';
import { OfferOkResponse } from './ok.dto';
import { Offer_EXAMPLES, Offer_OK } from '../../constants/offer.constants';
import { Service } from '@prisma/client';

export class CreatedOfferOkResponse extends OfferOkResponse {
  @ApiProperty({
    type: Offer_OK.CREATED,
    default: Offer_OK.CREATED,
    enum: Offer_OK,
  })
  message: Offer_OK.CREATED;

  @ApiProperty({
    example: Offer_EXAMPLES,
  })
  data: Service;
}
