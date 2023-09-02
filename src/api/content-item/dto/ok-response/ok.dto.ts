import { ApiProperty } from "@nestjs/swagger";
import { Area, ContentItem } from "@prisma/client";
import { ContentItem_EXAMPLES, ContentItem_OK } from "../../constants/content-item.constants";

export class ContentItemOkResponse {
    @ApiProperty({
        type: ContentItem_OK,
        enum: ContentItem_OK
    })

    message: ContentItem_OK;

    @ApiProperty({
        example: ContentItem_EXAMPLES
    })
    data: ContentItem

}