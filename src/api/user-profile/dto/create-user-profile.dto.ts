import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { PROPERTY_LENGTH } from 'src/common/constants/app.constants';

export class CreateUserProfileDto {
  @ApiProperty()
  @IsOptional()
  @Length(3, 30)
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @Length(3, 30)
  surnameName?: string;

  @ApiProperty()
  @IsOptional()
  @Length(3, 30)
  middleName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(PROPERTY_LENGTH.DESCRIPTION)
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(PROPERTY_LENGTH.SMALL_DESCRIPTION)
  smallDescription?: string;

  @ApiProperty()
  @IsOptional()
  status?: string;

  @ApiProperty()
  @IsOptional()
  @Length(3, 20)
  position?: string;
}
