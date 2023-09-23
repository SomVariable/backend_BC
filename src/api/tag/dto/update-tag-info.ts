import { PartialType } from '@nestjs/swagger';

import { CreateTagInfoDto } from './create-tag-info';

export class UpdateTagInfoDto extends PartialType(CreateTagInfoDto) {}
