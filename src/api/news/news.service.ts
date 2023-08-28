import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NEWS_OK } from './constants/news.constants';
import { CreateNewsTranslationBodyDto} from './dto/create-news-translation.dto';
import { createNewsInfo } from './types/news.types';

@Injectable()
export class NewsService {

  constructor(private prismaService: PrismaService) {}

  async create({userId}: CreateNewsDto) {
    const news = await this.prismaService.news.create({
      data: {userId}
    })
    
    return {
      message: NEWS_OK.SUCCESS_CREATION,
      data: {
        ...news
      }
    };
  }

  async addNewsInfo({langCode, text, title, newsId}: createNewsInfo) {
    const newsInfo = await this.prismaService.newsTranslation.create({
      data: {langCode, text, title, newsId}
    })

    return newsInfo
  }

  async findAll(userId: number) {
    return await this.prismaService.news.findMany({
      include: {NewsTranslation: true },
      where: {userId}
    });
  }

  async findOne(id: number) {
    return await this.prismaService.news.findUnique({
      include: {NewsTranslation: true },
      where: {
        id
      }
    });
  }

  async update(newsId: number, langCode: string, data: UpdateNewsDto) {
    const updatedNews = await this.prismaService.newsTranslation.update({
      where: {newsId_langCode: {langCode, newsId}},
      data
    })
    
    return updatedNews;
  }

  async remove(id: number) {
    return await this.prismaService.news.delete( {
      where: {id}
    } );
  }
}
