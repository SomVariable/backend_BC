import { ApiProperty } from "@nestjs/swagger";
import { CATEGORY_INFO_OK } from "../../constants/category.constants";
import { CategoryTranslationOkResponse } from "./ok.dto";

export class CategoryTranslationUpdatedOkResponse extends CategoryTranslationOkResponse {
    
    @ApiProperty({
        type: CATEGORY_INFO_OK.CREATED,
        default: CATEGORY_INFO_OK.CREATED,
        enum: CATEGORY_INFO_OK
    })
    message: CATEGORY_INFO_OK.CREATED;

    
}