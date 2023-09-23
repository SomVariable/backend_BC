import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryTranslationService } from './category-translation.service';
import { TRANSLATION_ROUTE_WITH_ID } from 'src/common/constants/app.constants';
import { CreateCategoryDto } from '../area/dto/create-category.dto';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';
import { TRANSLATION_ROUTE_WITH_CATEGORY_TYPE } from './constants/category.constants';
import { CategoryDto } from './dto/category-pram.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { CategoryTranslationCreatedOkResponse } from './dto/ok-response/created.dto';
import { CategoryTranslationUpdatedOkResponse } from './dto/ok-response/updated.dto';
import { CategoryTranslationNotFoundErrorResponse } from './dto/category-not-found-error.dto';
import { CategoryTranslationBadRequestErrorResponse } from './dto/category-bad-request-error.dto';
import { CreateCategoryTranslationInterceptor } from './interceptors/create.interceptor';
import { UpdateCategoryTranslationInterceptor } from './interceptors/update.interceptor';

@ApiTags('category-translation')
@ApiBearerAuth()
@ApiNotFoundResponse({
  type: CategoryTranslationNotFoundErrorResponse,
})
@ApiBadRequestResponse({
  type: CategoryTranslationBadRequestErrorResponse,
})
@UseInterceptors(BaseInterceptor)
@UseGuards(AccessJwtAuthGuard)
@Controller('category-translation')
export class CategoryTranslationController {
  constructor(
    private readonly categoryTranslationService: CategoryTranslationService,
  ) {}

  @Post(TRANSLATION_ROUTE_WITH_ID)
  @ApiOkResponse({ type: CategoryTranslationCreatedOkResponse })
  @UseInterceptors(CreateCategoryTranslationInterceptor)
  async createCategoryDto(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() data: CreateCategoryDto,
  ) {
    return await this.categoryTranslationService.createInfo(id, langCode, data);
  }

  @Patch(TRANSLATION_ROUTE_WITH_CATEGORY_TYPE)
  @ApiOkResponse({ type: CategoryTranslationUpdatedOkResponse })
  @UseInterceptors(UpdateCategoryTranslationInterceptor)
  async updateInfo(
    @Param() { categoryTranslationType, langCode, id }: CategoryDto,
    @Body() data: UpdateCategoryDto,
  ) {
    return await this.categoryTranslationService.updateInfo(
      id,
      categoryTranslationType,
      langCode,
      data,
    );
  }
}
