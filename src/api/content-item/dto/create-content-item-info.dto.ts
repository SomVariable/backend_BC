import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { PROPERTY_LENGTH } from 'src/common/constants/app.constants';

export class CreateContentItemInfoDto {
  @ApiProperty()
  @MaxLength(PROPERTY_LENGTH.TITLE)
  @IsString()
  title: string;

  @ApiProperty()
  @MaxLength(PROPERTY_LENGTH.DESCRIPTION)
  @IsString()
  description: string;

  @ApiProperty()
  @MaxLength(300)
  @IsString()
  content: string;
}
