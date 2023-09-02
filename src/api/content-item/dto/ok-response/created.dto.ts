import { ApiProperty } from "@nestjs/swagger";
import { ContentItemOkResponse } from "./ok.dto";
import { ContentItem_OK } from "../../constants/content-item.constants";

export class CreatedOkResponse extends ContentItemOkResponse {
    
    @ApiProperty({
        type: ContentItem_OK.CREATED,
        default: ContentItem_OK.CREATED,
        enum: ContentItem_OK
    })
    message: ContentItem_OK.CREATED;

}