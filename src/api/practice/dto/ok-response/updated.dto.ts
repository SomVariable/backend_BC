import { ApiProperty } from "@nestjs/swagger";
import { AreaOkResponse } from "./ok.dto";
import { PRACTICE_OK } from "../../constants/practice.constants";

export class UpdatedOkResponse extends AreaOkResponse {
    
    @ApiProperty({
        type: PRACTICE_OK.UPDATED,
        default: PRACTICE_OK.UPDATED,
        enum: PRACTICE_OK
    })
    message: PRACTICE_OK.UPDATED;

    
}