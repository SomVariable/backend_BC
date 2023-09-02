import { ApiProperty } from "@nestjs/swagger";
import { AwardOkResponse } from "./ok.dto";
import { Area, Award } from "@prisma/client";
import { AWARD_INFO_EXAMPLE, AWARD_OK, AWARD_WITH_TRANSLATION } from "../../constants/award.constants";

export class UpdatedInfoAwardOkResponse extends AwardOkResponse {
    
    @ApiProperty({
        type: AWARD_OK.INFO_UPDATED,
        default: AWARD_OK.INFO_UPDATED,
        enum: AWARD_OK
    })
    message: AWARD_OK.INFO_UPDATED;

    @ApiProperty({
        example:  AWARD_INFO_EXAMPLE
    })
    data: Award
}