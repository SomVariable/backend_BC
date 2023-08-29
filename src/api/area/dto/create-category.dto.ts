import { ApiProperty } from "@nestjs/swagger"
import { CategoryTranslationType } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator"
import { PROPERTY_LENGTH } from "src/common/constants/app.constants"

export class CreateCategoryDto {
    @ApiProperty()
    @IsEnum(CategoryTranslationType)
    @IsNotEmpty()
    categoryTranslationType: CategoryTranslationType
    
    @ApiProperty()
    @IsString()
    @MaxLength(PROPERTY_LENGTH.TITLE)
    @IsNotEmpty()
    title:                   string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    text:                    string
}
