import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from 'src/api/jwt-helper/types/jwt-helper.types';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';
import { CreateNewsTranslationBodyDto } from './dto/create-news-translation.dto';
import { ID_PARAM, TRANSLATION_ROUTE } from 'src/common/constants/app.constants';

@ApiTags("news")
@ApiBearerAuth()
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Post()
  create(
    @Body() createNewsDto: CreateNewsDto,
    @UserParam() jwtData: jwtType
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
  findOne(
    @Param('id') id: string,
    @UserParam() jwtData: jwtType) {
    return this.newsService.findOne(+id);
  }


  @Delete(ID_PARAM)
  remove(
    @Param('id') id: string,
    @UserParam() jwtData: jwtType) {
    return this.newsService.remove(+id);
  }

  @Post(TRANSLATION_ROUTE)
  async addNewsInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() { newsId, text, title }: CreateNewsTranslationBodyDto) {
    return this.newsService.addNewsInfo({
      id, langCode,
      newsId, text, title
    })
  }
  @Patch(TRANSLATION_ROUTE)
  async update(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() updateNewsDto: UpdateNewsDto,
    @UserParam() jwtData: jwtType) {
    return this.newsService.update(id, langCode, updateNewsDto);
  }
}
