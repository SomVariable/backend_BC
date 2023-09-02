import { ApiProperty } from "@nestjs/swagger";
import { Area, CategoryTranslation } from "@prisma/client";
import { CATEGORY_INFO_EXAMPLES, CATEGORY_INFO_OK } from "../../constants/category.constants";

export class CategoryTranslationOkResponse {
    @ApiProperty({
        type: CATEGORY_INFO_OK,
        enum: CATEGORY_INFO_OK
    })

    message: CATEGORY_INFO_OK;

    @ApiProperty({
        example: CATEGORY_INFO_EXAMPLES
    })
    data: CategoryTranslation

}