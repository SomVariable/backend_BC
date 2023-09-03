import { ApiProperty } from "@nestjs/swagger";
import { AreaOkResponse } from "./ok.dto";
import { PRACTICE_OK } from "../../constants/practice.constants";

export class DeletedOkResponse extends AreaOkResponse {
    
    @ApiProperty({
        type: PRACTICE_OK.DELETED,
        default: PRACTICE_OK.DELETED,
        enum: PRACTICE_OK
    })
    message: PRACTICE_OK.DELETED;

    
}