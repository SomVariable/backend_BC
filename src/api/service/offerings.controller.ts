import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { OfferingsService } from './offerings.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { CreateOfferDto } from './dto/create-offer.dto';
import { ID_PARAM, TRANSLATION_ROUTE_WITH_ID } from 'src/common/constants/app.constants';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';
import { CreateCategoryDto } from '../area/dto/create-category.dto';
import { UpdatePracticeDto } from '../practice/dto/update-practice.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { TRANSLATION_ROUTE_WITH_CATEGORY_TYPE } from '../area/constants/area.constants';
import { CategoryDto } from '../area/dto/category-pram.dto';
import { UpdateCategoryDto } from '../area/dto/update-category.dto';

@Controller('service')
@ApiTags("service")
@ApiBearerAuth()
@UseGuards(AccessJwtAuthGuard)
@UseInterceptors(BaseInterceptor)
export class OfferingsController {
  constructor(private readonly offeringsService: OfferingsService) {}

  @Post()
  async create(
    @Body() data: CreateOfferDto
  ){
    return await this.offeringsService.create(data)
  }

  @Post(TRANSLATION_ROUTE_WITH_ID)
  async createInfo(
    @Param() {id, langCode}: TranslationParamDto,
    @Body() data: CreateCategoryDto
  ){
    return await this.offeringsService.createInfo(id, langCode, data)
  }

  @Get()
  async getOfferings() {
    return await this.offeringsService.getOfferings()
  }

  @Get(ID_PARAM)
  async getPractice(
    @Param('id', ParseIntPipe) id: number 
  ) {
    return await this.offeringsService.getOffer(id)
  }

  @Patch(ID_PARAM)
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() data: UpdateOfferDto
  ) {
    return await this.offeringsService.update(id, data)
  }

  @Patch(TRANSLATION_ROUTE_WITH_CATEGORY_TYPE)
  async updateInfo(
    @Param() {categoryTranslationType, langCode}: CategoryDto, 
    @Body() data: UpdateCategoryDto
  ) {
    return await this.offeringsService.updateInfo(categoryTranslationType, langCode, data)
  }

  @Delete(ID_PARAM)
  async delete(
    @Param('id', ParseIntPipe) id: number, 
  ){
    return await this.offeringsService.delete(id)
  }
}
