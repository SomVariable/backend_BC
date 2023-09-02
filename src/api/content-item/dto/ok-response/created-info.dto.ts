import { ApiProperty } from "@nestjs/swagger";
import { ContentItemOkResponse } from "./ok.dto";
import { CONTENT_ITEM_OK } from "../../constants/content-item.constants";

export class CreatedInfoOkResponse extends ContentItemOkResponse {
    
    @ApiProperty({
        type: CONTENT_ITEM_OK.CREATED_INFO,
        default: CONTENT_ITEM_OK.CREATED_INFO,
        enum: CONTENT_ITEM_OK
    })
    message: CONTENT_ITEM_OK.CREATED_INFO;

}