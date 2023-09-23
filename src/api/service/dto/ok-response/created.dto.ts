import { ApiProperty } from '@nestjs/swagger';
import { OfferOkResponse } from './ok.dto';
import { Offer_OK } from '../../constants/offer.constants';

export class CreatedOkResponse extends OfferOkResponse {
  @ApiProperty({
    type: Offer_OK.CREATED,
    default: Offer_OK.CREATED,
    enum: Offer_OK,
  })
  message: Offer_OK.CREATED;
}
