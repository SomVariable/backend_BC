import { ApiProperty } from "@nestjs/swagger";
import {  Education } from "@prisma/client";
import { EDUCATION_EXAMPLES, EDUCATION_OK } from "../../constants/education.constants";

export class UpdatedOkResponse {
    @ApiProperty({
        type: EDUCATION_OK.UPDATED,
        default: EDUCATION_OK.UPDATED,
        enum: EDUCATION_OK
    })

    message: EDUCATION_OK.UPDATED;

    @ApiProperty({
        example: EDUCATION_EXAMPLES
    })
    data: any

}