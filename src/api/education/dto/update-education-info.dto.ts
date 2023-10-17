import { PartialType } from '@nestjs/swagger';
import { CreateEducationInfoDto } from './create-education-info.dto';

export class UpdateEducationInfoDto extends PartialType(
  CreateEducationInfoDto,
) {}
