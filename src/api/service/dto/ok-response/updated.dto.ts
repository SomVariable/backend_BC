import { ApiProperty } from "@nestjs/swagger";
import { OfferOkResponse } from "./ok.dto";
import { Offer_OK } from "../../constants/offer.constants";

export class UpdatedOkResponse extends OfferOkResponse {
    
    @ApiProperty({
        type: Offer_OK.UPDATED,
        default: Offer_OK.UPDATED,
        enum: Offer_OK
    })
    message: Offer_OK.UPDATED;
}