import { ApiProperty } from "@nestjs/swagger";
import { Offer_EXAMPLES } from "../../constants/offer.constants";
import { Area, Service } from "@prisma/client";
import { OfferOkResponse } from "./ok.dto";

export class GetOfferingsOkResponse {

    @ApiProperty({
        example: [
            Offer_EXAMPLES,
            Offer_EXAMPLES,
            "...n"
        ]
    })
    data: Service[]

}