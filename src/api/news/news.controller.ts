import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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

@ApiTags("news")
@ApiBearerAuth()
@ApiOkResponse({ type: NewsOkResponse})
@ApiBadRequestResponse({ type: NewsBadRequestErrorResponse})
@ApiNotFoundResponse({ type: NewsNotFoundErrorResponse})
@UseInterceptors(BaseInterceptor, NewsInterceptor)
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Post()
  create(
    @Body() createNewsDto: CreateNewsDto
  ) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  findAll(
    @UserParam() jwtData: jwtType
  ) {
    return this.newsService.findAll(jwtData.id);
  }

  @Get(ID_PARAM)
  @UseGuards(NewsAccessToDataGuard)
  findOne(
    @Param('id', ParseIntPipe) id: number) {
    return this.newsService.findOne(id);
  }


  @Delete(ID_PARAM)
  @UseGuards(NewsAccessToDataGuard)
  remove(
    @Param('id', ParseIntPipe) id: number) {
    return this.newsService.remove(id);
  }

  @Post(TRANSLATION_ROUTE)
  @UseGuards(NewsAccessToDataGuard)
  async addNewsInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() { newsId, text, title }: CreateNewsTranslationBodyDto) {
    return this.newsService.addNewsInfo({
      id, langCode,
      newsId, text, title
    })
  }
  
  @Patch(TRANSLATION_ROUTE)
  @UseGuards(NewsAccessToDataGuard)
  async update(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, langCode, updateNewsDto);
  }
}
