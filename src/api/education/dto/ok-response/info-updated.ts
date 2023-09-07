import { ApiProperty } from "@nestjs/swagger";
import {  Education } from "@prisma/client";
import { EDUCATION_EXAMPLES, EDUCATION_OK } from "../../constants/education.constants";

export class InfoUpdatedOkResponse {
    @ApiProperty({
        type: EDUCATION_OK.INFO_UPDATED,
        default: EDUCATION_OK.INFO_UPDATED,
        enum: EDUCATION_OK
    })

    message: EDUCATION_OK.INFO_UPDATED;

    @ApiProperty({
        example: EDUCATION_EXAMPLES
    })
    data: any

}