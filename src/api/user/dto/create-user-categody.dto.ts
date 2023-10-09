import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserCategoryDto {
    @ApiProperty()
    userId: number;
}

export class CreateUserPartnerCategoryDto extends CreateUserCategoryDto {

    @ApiProperty()
    quote_en: string = ""
    
    @ApiProperty()
    quote_ru: string = ""
}