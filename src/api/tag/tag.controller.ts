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
  Query,
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
  ApiOkResponse,
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
import { TagOkResponse } from './dto/ok-response/ok.dto';
import { TagInfoOkResponse } from './dto/ok-response/ok-info.dto';
import { GetTagOkResponse } from './dto/ok-response/get-tag.dto';
import { GetTagsOkResponse } from './dto/ok-response/get-tags.dto';
import { TagsInterceptor } from './interceptors/tags.interceptor';
import { GetTagsQueryDto } from './dto/get-tags.dto';
import { GetLatestTagsOkResponse } from './dto/ok-response/get-latest-tags.dto';

@ApiTags('tag')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: TagBadRequestErrorResponse })
@ApiNotFoundResponse({ type: TagNotFoundErrorResponse })
@RolesDecorator(Role.ADMIN)
@UseGuards(AccessJwtAuthGuard, RolesGuard)
@UseInterceptors(BaseInterceptor)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiOkResponse({ type: TagOkResponse })
  @UseInterceptors(TagInterceptor)
  async createTag(@Body() data: CreateTagDto) {
    return await this.tagService.create(data);
  }

  @Post(TRANSLATION_ROUTE_WITH_ID)
  @ApiOkResponse({ type: TagInfoOkResponse })
  @UseInterceptors(TagInterceptor)
  async createTagInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() data: CreateTagInfoDto,
  ) {
    return await this.tagService.createInfo(id, langCode, data);
  }

  @Get(ID_PARAM)
  @ApiOkResponse({ type: GetTagOkResponse })
  @UseInterceptors(TagInterceptor)
  async getTag(@Param('id', ParseIntPipe) id: number) {
    return await this.tagService.getTag(id);
  }

  @Get()
  @ApiOkResponse({ type: GetTagsOkResponse })
  @UseInterceptors(TagsInterceptor)
  async getTags(@Query() { limit, offset, ...data }: GetTagsQueryDto) {
    const tags = await this.tagService.getTags(limit, offset, data);
    const itemCount = await this.tagService.tagsCount();
    return {
      data: tags,
      limit,
      offset,
      itemCount,
    };
  }

  @Get(`/latest/:practiceId`)
  @ApiOkResponse({ type: GetLatestTagsOkResponse })
  @UseInterceptors(TagInterceptor)
  async getLatest(@Param('practiceId') practiceId: number) {
    return await this.tagService.getLatest(practiceId);
  }

  @Patch(TRANSLATION_ROUTE_WITH_ID)
  @ApiOkResponse({ type: TagInfoOkResponse })
  @UseInterceptors(TagInterceptor)
  async update(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() data: UpdateTagInfoDto,
  ) {
    return await this.tagService.updateTagInfo(id, langCode, data);
  }

  @Delete(ID_PARAM)
  @ApiOkResponse({ type: TagOkResponse })
  @UseInterceptors(TagInterceptor)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.tagService.delete(id);
  }
}
