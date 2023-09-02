import { ApiProperty } from "@nestjs/swagger";
import { AwardOkResponse } from "./ok.dto";
import { Area } from "@prisma/client";
import { AWARD_OK } from "../../constants/award.constants";

export class DeletedOkResponse extends AwardOkResponse {
    
    @ApiProperty({
        type: AWARD_OK.DELETED,
        default: AWARD_OK.DELETED,
        enum: AWARD_OK
    })
    message: AWARD_OK.CREATED;

    
}