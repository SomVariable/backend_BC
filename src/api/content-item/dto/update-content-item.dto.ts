import { PickType } from '@nestjs/swagger';
import { CreateContentItemDto } from './create-content-item.dto';

export class UpdateContentItemDto extends PickType(CreateContentItemDto, [
  'videoLink',
]) {}
