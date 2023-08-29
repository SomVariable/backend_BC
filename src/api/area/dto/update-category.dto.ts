import { PartialType, PickType } from '@nestjs/swagger';
import { CreateAreaDto } from './create-area.dto';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PickType(CreateCategoryDto, ["text", "title"]) {}
