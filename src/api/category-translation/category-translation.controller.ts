import { Body, Controller, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoryTranslationService } from './category-translation.service';
import { TRANSLATION_ROUTE_WITH_ID } from 'src/common/constants/app.constants';
import { CreateCategoryDto } from '../area/dto/create-category.dto';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';
import { TRANSLATION_ROUTE_WITH_CATEGORY_TYPE } from './constants/category.constants';
import { CategoryDto } from './dto/category-pram.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';

@ApiTags("category-translation")
@ApiBearerAuth()
@UseInterceptors(BaseInterceptor)
@UseGuards(AccessJwtAuthGuard)
@Controller('category-translation')
export class CategoryTranslationController {
  constructor(private readonly categoryTranslationService: CategoryTranslationService) {}

  @Post(TRANSLATION_ROUTE_WITH_ID)
  async createCategoryDto(
    @Param() {id, langCode}: TranslationParamDto,
    @Body() data: CreateCategoryDto
  ){
    return await this.categoryTranslationService.createInfo(id, langCode, data)
  }

  @Patch(TRANSLATION_ROUTE_WITH_CATEGORY_TYPE)
  async updateInfo(
    @Param() {categoryTranslationType, langCode}: CategoryDto, 
    @Body() data: UpdateCategoryDto
  ) {
    return await this.categoryTranslationService.updateInfo(categoryTranslationType, langCode, data)
  }
}


