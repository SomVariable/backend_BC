import { ApiProperty } from "@nestjs/swagger";
import { ContentItemOkResponse } from "./ok.dto";
import { ContentItem_OK } from "../../constants/content-item.constants";

export class CreatedOkResponse extends ContentItemOkResponse {
    
    @ApiProperty({
        type: ContentItem_OK.UPDATED,
        default: ContentItem_OK.UPDATED,
        enum: ContentItem_OK
    })
    message: ContentItem_OK.UPDATED;

}