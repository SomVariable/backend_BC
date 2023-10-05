import { ApiProperty } from '@nestjs/swagger';
import { Offer_WITH_FULL, Offer_WITH_TRANSLATION, ServiceWithFullData } from '../../constants/offer.constants';
import { Service } from '@prisma/client';
import { OfferOkResponse } from './ok.dto';

export class GetOfferFullOkResponse extends OfferOkResponse{
  @ApiProperty({
    example: Offer_WITH_FULL,
  })
  data: ServiceWithFullData;
}
