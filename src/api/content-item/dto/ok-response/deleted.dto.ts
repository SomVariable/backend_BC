import { ApiProperty } from "@nestjs/swagger";
import { ContentItemOkResponse } from "./ok.dto";
import { ContentItem_OK } from "../../constants/content-item.constants";

export class DeletedOkResponse extends ContentItemOkResponse {
    
    @ApiProperty({
        type: ContentItem_OK.DELETED,
        default: ContentItem_OK.DELETED,
        enum: ContentItem_OK
    })
    message: ContentItem_OK.DELETED;

}