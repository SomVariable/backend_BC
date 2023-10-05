import { ApiProperty } from '@nestjs/swagger';
import { Offer_WITH_TRANSLATION } from '../../constants/offer.constants';
import { Service } from '@prisma/client';
import { OfferOkResponse } from './ok.dto';

export class GetOfferOkResponse extends OfferOkResponse{
  @ApiProperty({
    example: Offer_WITH_TRANSLATION,
  })
  data: Service;
}
