import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsNotEmpty, IsPositive, IsString, IsInt } from 'class-validator';

export class CreateUserCategoryDto {
    @ApiProperty()
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    userId: number;
}

export class CreateUserPartnerCategoryDto extends CreateUserCategoryDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    quote_en: string = ""
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    quote_ru: string = ""
}