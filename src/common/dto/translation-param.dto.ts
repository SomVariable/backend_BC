import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

enum LANGS {
    RU = 'ru',
    EN = 'en'
} 

export class LangCodeDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEnum(LANGS)
    @Length(2)
    langCode: string
}

export class TranslationParamDto extends LangCodeDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number
}