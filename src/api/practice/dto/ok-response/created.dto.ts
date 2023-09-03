import { ApiProperty } from "@nestjs/swagger";
import { AreaOkResponse } from "./ok.dto";
import { PRACTICE_OK } from "../../constants/practice.constants";

export class CreatedOkResponse extends AreaOkResponse {
    
    @ApiProperty({
        type: PRACTICE_OK.CREATED,
        default: PRACTICE_OK.CREATED,
        enum: PRACTICE_OK
    })
    message: PRACTICE_OK.CREATED;

    
}