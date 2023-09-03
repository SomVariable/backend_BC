import { ApiProperty } from "@nestjs/swagger";
import { Area, ContentItem, Education, Tag } from "@prisma/client";
import { TAG_OK, TAG_EXAMPLES } from "../../constants/tag.constants";

export class EducationOkResponse {
    @ApiProperty({
        type: TAG_OK.OK,
        enum: TAG_OK
    })

    message: TAG_OK.OK;

    @ApiProperty({
        example: TAG_EXAMPLES
    })
    data: Tag

}