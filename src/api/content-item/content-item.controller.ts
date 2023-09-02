import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { ContentItemService } from './content-item.service';
import { CreateContentItemDto } from './dto/create-content-item.dto';
import { CreateContentItemInfoDto } from './dto/create-content-item-info.dto';
import { UpdateContentItemDto } from './dto/update-content-item.dto';
import { UpdateContentItemInfoDto } from './dto/update-content-item-info.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';
import { ID_PARAM, TRANSLATION_ROUTE_WITH_ID } from 'src/common/constants/app.constants';
import { ContentItemAccessToDataGuard } from './guards/access-to-data.guard';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { CreatedOkResponse } from './dto/ok-response/created.dto';
import { CreateContentItemInfoInterceptor } from './interceptors/create-content-item-info.interceptor';
import { UpdateContentItemInterceptor } from './interceptors/update-content-item.interceptor';
import { DeletedOkResponse } from './dto/ok-response/deleted.dto';
import { DeleteContentItemInterceptor } from './interceptors/delete-content-item.interceptor';
import { CreatedInfoOkResponse } from './dto/ok-response/created-info.dto';
import { UpdateContentItemInfoInterceptor } from './interceptors/update-content-item-info.interceptor';
import { UpdatedInfoOkResponse } from './dto/ok-response/updated-info.dto';
import { GetContentItemInterceptor } from './interceptors/get-content-item.interceptor';
import { GetContentItemOkResponse } from './dto/ok-response/get-content-item.dto';
import { GetContentItemsOkResponse } from './dto/ok-response/get-content-items.dto';

@ApiTags("content-item")
@ApiBearerAuth()
@UseInterceptors(BaseInterceptor)
@UseGuards(AccessJwtAuthGuard)
@Controller('content-item')
export class ContentItemController {
  constructor(private readonly publicationService: ContentItemService) { }

  @Post()
  @ApiOkResponse({ type: CreatedOkResponse })
  @UseInterceptors(CreateContentItemInfoInterceptor)
  async create(
    @Body() data: CreateContentItemDto
  ) {
    return await this.publicationService.create(data)
  }

  @Get(ID_PARAM)
  @ApiOkResponse({ type: CreatedOkResponse })
  @ApiOkResponse( {type: GetContentItemOkResponse} )
  @UseInterceptors(GetContentItemInterceptor)
  async getContentItem(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.publicationService.getContentItem(id)
  }

  @Get(ID_PARAM)
  @ApiOkResponse( {type: GetContentItemsOkResponse} )
  @UseInterceptors(GetContentItemInterceptor)
  async getContentItems(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.publicationService.getContentItems(id)
  }

  @Patch(ID_PARAM)
  @ApiOkResponse({ type: UpdateContentItemInterceptor })
  @UseInterceptors(UpdateContentItemInterceptor)
  @UseGuards(ContentItemAccessToDataGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateContentItemDto) {
    return await this.publicationService.update(id, body)
  }

  @Delete(ID_PARAM)
  @ApiOkResponse({ type: DeletedOkResponse })
  @UseInterceptors(DeleteContentItemInterceptor)
  async delete(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.publicationService.deleteContentItem(id)
  }

  @Post(TRANSLATION_ROUTE_WITH_ID)
  @ApiOkResponse({ type: CreatedInfoOkResponse })
  @UseInterceptors(CreateContentItemInfoInterceptor)
  async createInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() data: CreateContentItemInfoDto
  ) {
    return await this.publicationService.createInfo(id, langCode, data)
  }

  @Patch(TRANSLATION_ROUTE_WITH_ID)
  @ApiOkResponse({ type: UpdatedInfoOkResponse })
  @UseInterceptors(UpdateContentItemInfoInterceptor)
  async updateInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() body: UpdateContentItemInfoDto) {
    return await this.publicationService.updateInfo(id, langCode, body)
  }
}
