import { ApiProperty } from '@nestjs/swagger';
import {
  Offer_WITH_FULL,
  ServiceWithFullData,
} from '../../constants/offer.constants';
import { OfferOkResponse } from './ok.dto';

export class GetOfferFullOkResponse extends OfferOkResponse {
  @ApiProperty({
    example: Offer_WITH_FULL,
  })
  data: ServiceWithFullData;
}
