import { ApiProperty } from "@nestjs/swagger";
import { AwardOkResponse } from "./ok.dto";
import { Area, Award } from "@prisma/client";
import { AWARD_INFO_EXAMPLE, AWARD_OK, AWARD_WITH_TRANSLATION } from "../../constants/award.constants";

export class CreatedInfoAwardOkResponse extends AwardOkResponse {
    
    @ApiProperty({
        type: AWARD_OK.INFO_CREATED,
        default: AWARD_OK.INFO_CREATED,
        enum: AWARD_OK
    })
    message: AWARD_OK.INFO_CREATED;

    @ApiProperty({
        example:  AWARD_INFO_EXAMPLE
    })
    data: Award
}