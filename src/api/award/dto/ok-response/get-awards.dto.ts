import { ApiProperty } from "@nestjs/swagger";
import { AwardOkResponse } from "./ok.dto";
import { Area, Award } from "@prisma/client";
import { AWARD_OK, AWARD_WITH_TRANSLATION } from "../../constants/award.constants";

export class GetAwardsOkResponse extends AwardOkResponse {
    
    @ApiProperty({
        example:  [
            AWARD_WITH_TRANSLATION,
            AWARD_WITH_TRANSLATION,
            "...n"
        ]
    })
    data: Award
}