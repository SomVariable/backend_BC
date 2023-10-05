import { ApiProperty } from '@nestjs/swagger';
import { OfferOkResponse } from './ok.dto';
import { Offer_EXAMPLES, Offer_OK } from '../../constants/offer.constants';
import { Service } from '@prisma/client';

export class DeletedOfferOkResponse extends OfferOkResponse {
  @ApiProperty({
    type: Offer_OK.DELETED,
    default: Offer_OK.DELETED,
    enum: Offer_OK,
  })
  message: Offer_OK.DELETED;

  @ApiProperty({
    example: Offer_EXAMPLES,
  })
  data: Service;
}
