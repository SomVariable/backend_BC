import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength } from "class-validator"
import { PROPERTY_LENGTH } from "src/common/constants/app.constants"

export class CreateNewsTranslationBodyDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(PROPERTY_LENGTH.TEXT)
    text?
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(PROPERTY_LENGTH.TITLE)
    title?
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(PROPERTY_LENGTH.TITLE)
    subtitle?

}

