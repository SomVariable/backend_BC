import { PartialType } from '@nestjs/swagger';
import { CreateProfessionalInterestDto } from './create-professional-interest.dto';

export class UpdateProfessionalInterestDto extends PartialType(
  CreateProfessionalInterestDto,
) {}
