import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Patch,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import {
  ID_PARAM,
  TRANSLATION_ROUTE_WITH_ID,
} from 'src/common/constants/app.constants';
import { CreateTagInfoDto } from './dto/create-tag-info';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';
import { UpdateTagInfoDto } from './dto/update-tag-info';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesDecorator } from '../roles/roles.decorator';
import { Role } from '@prisma/client';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { TagInterceptor } from './interceptors/tag.interceptor';
import { TagBadRequestErrorResponse } from './dto/tag-bad-request-error.dto';
import { TagNotFoundErrorResponse } from './dto/tag-not-found-error.dto';

@ApiTags('tag')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: TagBadRequestErrorResponse })
@ApiNotFoundResponse({ type: TagNotFoundErrorResponse })
@RolesDecorator(Role.ADMIN)
@UseGuards(AccessJwtAuthGuard, RolesGuard)
@UseInterceptors(BaseInterceptor, TagInterceptor)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async createTag(data: CreateTagDto) {
    return await this.tagService.create(data);
  }

  @Post(TRANSLATION_ROUTE_WITH_ID)
  async createTagInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() data: CreateTagInfoDto,
  ) {
    return await this.tagService.createInfo(id, langCode, data);
  }

  @Get(ID_PARAM)
  async getTag(@Param('id', ParseIntPipe) id: number) {
    return await this.tagService.getTag(id);
  }

  @Get()
  async getTags() {
    return await this.tagService.getTags();
  }

  @Patch(TRANSLATION_ROUTE_WITH_ID)
  async update(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() data: UpdateTagInfoDto,
  ) {
    return await this.tagService.updateTagInfo(id, langCode, data);
  }

  @Delete()
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.tagService.delete(id);
  }
}
