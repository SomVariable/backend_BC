import { ApiProperty } from "@nestjs/swagger";
import { CategoryTranslationType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { LangCodeDto } from "src/common/dto/translation-param.dto";

export class CategoryDto extends LangCodeDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEnum(CategoryTranslationType)
    categoryTranslationType: string
}