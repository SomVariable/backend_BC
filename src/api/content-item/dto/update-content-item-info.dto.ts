import { PartialType } from '@nestjs/swagger';
import { CreateContentItemInfoDto } from './create-content-item-info.dto';

export class UpdateContentItemInfoDto extends PartialType(CreateContentItemInfoDto) {}
