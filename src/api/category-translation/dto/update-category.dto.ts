import { PickType } from '@nestjs/swagger';
import { CreateCategoryDto } from '../../area/dto/create-category.dto';

export class UpdateCategoryDto extends PickType(CreateCategoryDto, [
  'text',
  'title',
]) {}
