import { ApiProperty } from '@nestjs/swagger';
import { Offer_EXAMPLES } from '../../constants/offer.constants';
import { Service } from '@prisma/client';

export class GetOfferingsOkResponse {
  @ApiProperty({
    example: [Offer_EXAMPLES, Offer_EXAMPLES, '...n'],
  })
  data: Service[];
}
