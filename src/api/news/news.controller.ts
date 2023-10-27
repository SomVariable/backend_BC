import { PhotoService } from './../photo/photo.service';
import {
  ParseFilePipe,
  UploadedFile,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from 'src/api/jwt-helper/types/jwt-helper.types';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';
import { CreateNewsTranslationBodyDto } from './dto/create-news-translation.dto';
import {
  TRANSLATION_ROUTE,
} from 'src/common/constants/app.constants';
import { NewsInterceptor } from './interceptors/news.interceptor';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { NewsBadRequestErrorResponse } from './dto/news-bad-request-error.dto';
import { NewsNotFoundErrorResponse } from './dto/news-not-found-error.dto';
import { NewsOkResponse } from './dto/ok-response/ok.dto';
import { NewsAccessToDataGuard } from './guards/news-access-to-data.guard';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { API_FILE_CONFIG } from '../photo/constants/photo.constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { validateFile } from '../photo/helpers/fileValidation.helper';
import { Role } from '@prisma/client';
import { RolesDecorator } from '../roles/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('news')
@ApiBearerAuth()
@ApiOkResponse({ type: NewsOkResponse })
@ApiBadRequestResponse({ type: NewsBadRequestErrorResponse })
@ApiNotFoundResponse({ type: NewsNotFoundErrorResponse })
@UseInterceptors(BaseInterceptor, NewsInterceptor)
@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly photoService: PhotoService,
  ) {}

  @Post()
  @RolesDecorator(Role.ADMIN, Role.REPORTER)
  @UseGuards(RolesGuard, AccessJwtAuthGuard)
  async create(@Body() createNewsDto: CreateNewsDto) {
    return await this.newsService.create(createNewsDto);
  }

  @Post(`:id/preview`)
  @ApiConsumes('multipart/form-data')
  @ApiBody(API_FILE_CONFIG)
  @RolesDecorator(Role.ADMIN, Role.REPORTER)
  @UseGuards(RolesGuard, AccessJwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(new ParseFilePipe(validateFile)) file: Express.Multer.File,
  ) {
    return await this.photoService.create(file, {
      type: 'NEWS',
      newsId: id,
      itemId: id,
    });
  }

  @Get()
  async findAll(@Query() { limit, offset }: QueryPaginationParam) {
    return await this.newsService.findAll(offset, limit);
  }

  @Get('/byUser')
  @UseGuards(AccessJwtAuthGuard)
  async findAllByUser(
    @UserParam() jwtData: jwtType,
    @Query() { limit, offset }: QueryPaginationParam,
  ) {
    return await this.newsService.findAll(offset, limit, jwtData.id, 'user');
  }

  @Get(`/byTag/:id`)
  async findAllByTag(
    @Param('id', ParseIntPipe) id: number,
    @Query() { limit, offset }: QueryPaginationParam,
  ) {
    return await this.newsService.findAll(offset, limit, id, 'tag');
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.newsService.findOne(id);
  }

  @Delete(':id')
  @RolesDecorator(Role.ADMIN, Role.REPORTER)
  @UseGuards(RolesGuard, AccessJwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.newsService.remove(id);
  }

  @Post(TRANSLATION_ROUTE)
  @RolesDecorator(Role.ADMIN, Role.REPORTER)
  @UseGuards(RolesGuard, AccessJwtAuthGuard, NewsAccessToDataGuard)
  async addNewsInfo(
    @Param() paramData: TranslationParamDto,
    @Body() bodyData: CreateNewsTranslationBodyDto,
  ) {
    return await this.newsService.addNewsInfo(paramData, bodyData);
  }

  @Patch(TRANSLATION_ROUTE)
  @RolesDecorator(Role.ADMIN, Role.REPORTER)
  @UseGuards(RolesGuard, AccessJwtAuthGuard, NewsAccessToDataGuard)
  async update(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() updateNewsDto: UpdateNewsDto,
  ) {
    return await this.newsService.update(id, langCode, updateNewsDto);
  }
}
