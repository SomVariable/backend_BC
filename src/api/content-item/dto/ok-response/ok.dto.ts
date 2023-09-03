import { ApiProperty } from "@nestjs/swagger";
import { Area, ContentItem } from "@prisma/client";
import { CONTENT_ITEM_OK, CONTENT_ITEM_EXAMPLES } from "../../constants/content-item.constants";

export class ContentItemOkResponse {
    @ApiProperty({
        type: CONTENT_ITEM_OK,
        enum: CONTENT_ITEM_OK
    })

    message: CONTENT_ITEM_OK;

    @ApiProperty({
        example: CONTENT_ITEM_EXAMPLES
    })
    data: ContentItem

}