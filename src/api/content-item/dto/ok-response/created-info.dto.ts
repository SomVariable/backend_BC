import { ApiProperty } from "@nestjs/swagger";
import { ContentItemOkResponse } from "./ok.dto";
import { ContentItem_OK } from "../../constants/content-item.constants";

export class CreatedInfoOkResponse extends ContentItemOkResponse {
    
    @ApiProperty({
        type: ContentItem_OK.CREATED_INFO,
        default: ContentItem_OK.CREATED_INFO,
        enum: ContentItem_OK
    })
    message: ContentItem_OK.CREATED_INFO;

}