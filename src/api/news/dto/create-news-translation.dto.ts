import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator"

export class CreateNewsTranslationBodyDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    text?
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    title?
    
    @ApiProperty()
    @IsString()
    newsId
}

