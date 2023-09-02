import { ApiProperty } from "@nestjs/swagger";
import { ContentItemOkResponse } from "./ok.dto";
import { ContentItem_OK, ContentItem_WITH_TRANSLATION } from "../../constants/content-item.constants";
import { ContentItem } from "@prisma/client";

export class GetContentItemOkResponse extends ContentItemOkResponse {
    
    @ApiProperty({
        example: ContentItem_WITH_TRANSLATION
    })
    data: ContentItem;

}