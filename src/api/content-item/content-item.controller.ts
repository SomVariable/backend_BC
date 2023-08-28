import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { ContentItemService } from './content-item.service';
import { CreateContentItemDto } from './dto/create-content-item.dto';
import { CreateContentItemInfoDto } from './dto/create-content-item-info.dto';
import { UpdateContentItemDto } from './dto/update-content-item.dto';
import { UpdateContentItemInfoDto } from './dto/update-content-item-info.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';
import { ID_PARAM, TRANSLATION_ROUTE_WITH_ID } from 'src/common/constants/app.constants';
import { ContentItemAccessToDataGuard } from './guards/access-to-data.guard';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';

@ApiTags("content-item")
@ApiBearerAuth()
@UseInterceptors(BaseInterceptor)
@UseGuards(AccessJwtAuthGuard)
@Controller('content-item')
export class ContentItemController {
  constructor(private readonly publicationService: ContentItemService) { }

  @Post()
  async create(
    @Body() data: CreateContentItemDto
  ) {
    return await this.publicationService.create(data)
  }

  @Get(ID_PARAM)
  async getContentItem(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.publicationService.getContentItem(id)
  }

  @Get(ID_PARAM)
  async getContentItems(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.publicationService.getContentItems(id)
  }

  @Patch(ID_PARAM)
  @UseGuards(ContentItemAccessToDataGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateContentItemDto) {
    return await this.publicationService.update(id, body)
  }

  @Delete(ID_PARAM)
  async delete(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.publicationService.deleteContentItem(id)
  }

  @Post(TRANSLATION_ROUTE_WITH_ID)
  async createInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() data: CreateContentItemInfoDto
  ) {
    return await this.publicationService.createInfo(id, langCode, data)
  }

  @Patch(TRANSLATION_ROUTE_WITH_ID)
  async updateInfo(
    @Param() {id, langCode}: TranslationParamDto,
    @Body() body: UpdateContentItemInfoDto) {
    return await this.publicationService.updateInfo(id, langCode, body)
  }
}
