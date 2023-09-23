import { ApiProperty } from '@nestjs/swagger';
import { ContentItemType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContentItemDto {
  @ApiProperty()
  @IsEnum(ContentItemType)
  @IsNotEmpty()
  type: ContentItemType;

  @ApiProperty()
  @IsOptional()
  @IsString()
  videoLink?: string;
}
