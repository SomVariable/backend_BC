import { ApiProperty } from "@nestjs/swagger";
import { Offer_WITH_TRANSLATION } from "../../constants/offer.constants";
import { Service } from "@prisma/client";


export class GetOfferOkResponse {

    @ApiProperty({
        example: Offer_WITH_TRANSLATION
    })
    data: Service

}