import { ApiProperty } from "@nestjs/swagger";
import {  Education } from "@prisma/client";
import { EDUCATION_EXAMPLES, EDUCATION_OK } from "../../constants/education.constants";

export class DeletedOkResponse {
    @ApiProperty({
        type: EDUCATION_OK.DELETED,
        default: EDUCATION_OK.DELETED,
        enum: EDUCATION_OK
    })

    message: EDUCATION_OK.DELETED;

    @ApiProperty({
        example: EDUCATION_EXAMPLES
    })
    data: any

}