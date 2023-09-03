import { ApiProperty } from "@nestjs/swagger";
import { Offer_EXAMPLES, Offer_OK } from "../../constants/offer.constants";
import { Area, Service } from "@prisma/client";

export class OfferOkResponse {
    @ApiProperty({
        type: Offer_OK,
        enum: Offer_OK
    })

    message: Offer_OK;

    @ApiProperty({
        example: Offer_EXAMPLES
    })
    data: Service

}