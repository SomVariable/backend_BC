import { ApiProperty } from '@nestjs/swagger';
import { OfferOkResponse } from './ok.dto';
import { Offer_OK } from '../../constants/offer.constants';

export class DeletedOkResponse extends OfferOkResponse {
  @ApiProperty({
    type: Offer_OK.DELETED,
    default: Offer_OK.DELETED,
    enum: Offer_OK,
  })
  message: Offer_OK.DELETED;
}
