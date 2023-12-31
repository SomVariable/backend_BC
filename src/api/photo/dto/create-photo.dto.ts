import { ApiProperty } from '@nestjs/swagger';
import { PhotoType } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreatePhotoBodyDto {
  @ApiProperty()
  @IsEnum(PhotoType)
  @IsNotEmpty()
  type: PhotoType;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  itemId: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  userId?: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  newsId?: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  contentItemId?: number;
}
