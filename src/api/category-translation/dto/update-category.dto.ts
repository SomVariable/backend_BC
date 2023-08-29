import { PartialType, PickType } from '@nestjs/swagger';
import { CreateAreaDto } from '../../area/dto/create-area.dto';
import { CreateCategoryDto } from '../../area/dto/create-category.dto';

export class UpdateCategoryDto extends PickType(CreateCategoryDto, ["text", "title"]) {}
