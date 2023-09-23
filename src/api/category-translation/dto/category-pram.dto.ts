import { ApiProperty } from '@nestjs/swagger';
import { CategoryTranslationType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';

export class CategoryDto extends TranslationParamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(CategoryTranslationType)
  categoryTranslationType: string;
}
