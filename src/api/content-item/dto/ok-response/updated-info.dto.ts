import { ApiProperty } from "@nestjs/swagger";
import { ContentItemOkResponse } from "./ok.dto";
import { ContentItem_OK } from "../../constants/content-item.constants";

export class UpdatedInfoOkResponse extends ContentItemOkResponse {
    
    @ApiProperty({
        type: ContentItem_OK.UPDATED_INFO,
        default: ContentItem_OK.UPDATED_INFO,
        enum: ContentItem_OK
    })
    message: ContentItem_OK.UPDATED_INFO;

}