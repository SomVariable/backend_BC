import { ApiProperty } from "@nestjs/swagger";
import { AwardOkResponse } from "./ok.dto";
import { Area, Award } from "@prisma/client";
import { AWARD_OK, AWARD_WITH_TRANSLATION } from "../../constants/award.constants";

export class GetAwardOkResponse extends AwardOkResponse {
    
    @ApiProperty({
        example:  AWARD_WITH_TRANSLATION
    })
    data: Award
}