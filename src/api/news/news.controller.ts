import { PhotoService } from './../photo/photo.service';
import { ParseFilePipe, UploadedFile, Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UseGuards, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from 'src/api/jwt-helper/types/jwt-helper.types';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';
import { CreateNewsTranslationBodyDto } from './dto/create-news-translation.dto';
import { ID_PARAM, TRANSLATION_ROUTE } from 'src/common/constants/app.constants';
import { NewsInterceptor } from './interceptors/news.interceptor';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { NewsBadRequestErrorResponse } from './dto/news-bad-request-error.dto';
import { NewsNotFoundErrorResponse } from './dto/news-not-found-error.dto';
import { NewsOkResponse } from './dto/ok-response/ok.dto';
import { NewsAccessToDataGuard } from './guards/news_access.guard';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { API_FILE_CONFIG } from '../photo/constants/photo.constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { validateFile } from '../photo/helpers/fileValidation.helper';

@ApiTags("news")
@ApiBearerAuth()
@ApiOkResponse({ type: NewsOkResponse})
@ApiBadRequestResponse({ type: NewsBadRequestErrorResponse})
@ApiNotFoundResponse({ type: NewsNotFoundErrorResponse})
@UseInterceptors(BaseInterceptor, NewsInterceptor)
@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly photoService: PhotoService) { }

  @Post()
  @UseGuards(AccessJwtAuthGuard)
  create(
    @Body() createNewsDto: CreateNewsDto
  ) {
    return this.newsService.create(createNewsDto);
  }

  @Post(`${ID_PARAM}/preview`)
  @ApiConsumes('multipart/form-data')
  @ApiBody(API_FILE_CONFIG)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(new ParseFilePipe(validateFile)) file: Express.Multer.File
  ) {
    return this.photoService.create(file, {
      type: 'NEWS',
      newsId: id,
      itemId: id
    })
  }

  @Get()
  findAll(
    @Query() {limit, offset}: QueryPaginationParam
  ) {
    return this.newsService.findAll(offset, limit);
  }

  @Get('/byUser')
  @UseGuards(AccessJwtAuthGuard)
  findAllByUser(
    @UserParam() jwtData: jwtType,
    @Query() {limit, offset}: QueryPaginationParam
  ) {
    return this.newsService.findAll(offset, limit, jwtData.id, "user");
  }

  @Get(`/byTag/${ID_PARAM}`)
  findAllByTag(
    @Param('id', ParseIntPipe) id: number,
    @Query() {limit, offset}: QueryPaginationParam
  ) {
    return this.newsService.findAll(offset, limit, id, "tag");
  }

  @Get(ID_PARAM)
  findOne(
    @Param('id', ParseIntPipe) id: number) {
    return this.newsService.findOne(id);
  }


  @Delete(ID_PARAM)
  @UseGuards(AccessJwtAuthGuard)
  remove(
    @Param('id', ParseIntPipe) id: number) {
    return this.newsService.remove(id);
  }

  @Post(TRANSLATION_ROUTE)
  @UseGuards(AccessJwtAuthGuard, NewsAccessToDataGuard)
  async addNewsInfo(
    @Param() paramData: TranslationParamDto,
    @Body() bodyData: CreateNewsTranslationBodyDto) {
    return this.newsService.addNewsInfo(paramData, bodyData)
  }
  
  @Patch(TRANSLATION_ROUTE)
  @UseGuards(AccessJwtAuthGuard, NewsAccessToDataGuard)
  async update(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, langCode, updateNewsDto);
  }
}
