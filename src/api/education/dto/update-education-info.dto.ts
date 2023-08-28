import { PartialType } from '@nestjs/swagger';
import { CreateEducationDto } from './create-education.dto';
import { CreateEducationInfoDto } from './create-education-info.dto';

export class UpdateEducationInfoDto extends PartialType(CreateEducationInfoDto) {}
