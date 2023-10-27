import {
  Query,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ContentItemService } from './content-item.service';
import { CreateContentItemDto } from './dto/create-content-item.dto';
import { CreateContentItemInfoDto } from './dto/create-content-item-info.dto';
import { UpdateContentItemDto } from './dto/update-content-item.dto';
import { UpdateContentItemInfoDto } from './dto/update-content-item-info.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';
import {
  TRANSLATION_ROUTE_WITH_ID,
} from 'src/common/constants/app.constants';
import { ContentItemAccessToDataGuard } from './guards/access-to-data.guard';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { CreatedContentItemOkResponse } from './dto/ok-response/created.dto';
import { CreateContentItemInfoInterceptor } from './interceptors/create-content-item-info.interceptor';
import { UpdateContentItemInterceptor } from './interceptors/update-content-item.interceptor';
import { DeletedContentItemOkResponse } from './dto/ok-response/deleted.dto';
import { DeleteContentItemInterceptor } from './interceptors/delete-content-item.interceptor';
import { CreatedContentItemInfoOkResponse } from './dto/ok-response/created-info.dto';
import { UpdateContentItemInfoInterceptor } from './interceptors/update-content-item-info.interceptor';
import { UpdatedContentItemInfoOkResponse } from './dto/ok-response/updated-info.dto';
import { GetContentItemInterceptor } from './interceptors/get-content-item.interceptor';
import { GetContentItemOkResponse } from './dto/ok-response/get-content-item.dto';
import { GetContentItemsOkResponse } from './dto/ok-response/get-content-items.dto';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from '../jwt-helper/types/jwt-helper.types';
import { RolesDecorator } from '../roles/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('content-item')
@ApiBearerAuth()
@UseInterceptors(BaseInterceptor)
@UseGuards(AccessJwtAuthGuard)
@Controller('content-item')
export class ContentItemController {
  constructor(private readonly publicationService: ContentItemService) {}

  @Post()
  @ApiOkResponse({ type: CreatedContentItemOkResponse })
  @RolesDecorator(Role.ADMIN, Role.REPORTER)
  @UseGuards(RolesGuard)
  @UseInterceptors(CreateContentItemInfoInterceptor)
  async create(@Body() data: CreateContentItemDto) {
    return await this.publicationService.create(data);
  }

  @Get(':id')
  @ApiOkResponse({ type: CreatedContentItemOkResponse })
  @ApiOkResponse({ type: GetContentItemOkResponse })
  @UseInterceptors(GetContentItemInterceptor)
  async getContentItem(@Param('id', ParseIntPipe) id: number) {
    return await this.publicationService.getContentItem(id);
  }

  @Get()
  @ApiOkResponse({ type: GetContentItemsOkResponse })
  @UseGuards(AccessJwtAuthGuard)
  @UseInterceptors(GetContentItemInterceptor)
  async getContentItems(
    @Query() { limit, offset }: QueryPaginationParam,
    @UserParam() { id }: jwtType,
  ) {
    return await this.publicationService.getContentItems(id, offset, limit);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateContentItemInterceptor })
  @RolesDecorator(Role.ADMIN, Role.REPORTER)
  @UseInterceptors(UpdateContentItemInterceptor)
  @UseGuards(RolesGuard, ContentItemAccessToDataGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateContentItemDto,
  ) {
    return await this.publicationService.update(id, body);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeletedContentItemOkResponse })
  @RolesDecorator(Role.ADMIN, Role.REPORTER)
  @UseGuards(RolesGuard)
  @UseInterceptors(DeleteContentItemInterceptor)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.publicationService.deleteContentItem(id);
  }

  @Delete()
  @RolesDecorator(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: DeletedContentItemOkResponse })
  @UseInterceptors(DeleteContentItemInterceptor)
  async deleteAll() {
    return await this.publicationService.drop();
  }

  @Post(TRANSLATION_ROUTE_WITH_ID)
  @ApiOkResponse({ type: CreatedContentItemInfoOkResponse })
  @RolesDecorator(Role.ADMIN, Role.REPORTER)
  @UseGuards(RolesGuard)
  @UseInterceptors(CreateContentItemInfoInterceptor)
  async createInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() data: CreateContentItemInfoDto,
  ) {
    return await this.publicationService.createInfo(id, langCode, data);
  }

  @Patch(TRANSLATION_ROUTE_WITH_ID)
  @ApiOkResponse({ type: UpdatedContentItemInfoOkResponse })
  @RolesDecorator(Role.ADMIN, Role.REPORTER)
  @UseGuards(RolesGuard)
  @UseInterceptors(UpdateContentItemInfoInterceptor)
  async updateInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() body: UpdateContentItemInfoDto,
  ) {
    return await this.publicationService.updateInfo(id, langCode, body);
  }
}
