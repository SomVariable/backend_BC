import { ApiProperty } from '@nestjs/swagger';
import { Offer_EXAMPLES } from '../../constants/offer.constants';
import { Service } from '@prisma/client';
import { OfferOkResponse } from './ok.dto';

export class GetOfferingsOkResponse extends OfferOkResponse {
  @ApiProperty({
    example: [Offer_EXAMPLES, Offer_EXAMPLES, '...n'],
  })
  data: Service[];
}
