import { ApiProperty } from "@nestjs/swagger";
import { Area, ContentItem, Education } from "@prisma/client";
import { EDUCATION_EXAMPLES, EDUCATION_OK } from "../../constants/education.constants";

export class EducationOkResponse {
    @ApiProperty({
        type: EDUCATION_OK.OK,
        enum: EDUCATION_OK
    })

    message: EDUCATION_OK.OK;

    @ApiProperty({
        example: EDUCATION_EXAMPLES
    })
    data: Education

}