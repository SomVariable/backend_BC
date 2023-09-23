import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NEWS_OK } from './constants/news.constants';
import { CreateNewsTranslationBodyDto } from './dto/create-news-translation.dto';
import { mapToIdObject } from 'src/common/helpers/map-to-id-object.helper';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';

@Injectable()
export class NewsService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateNewsDto) {
    const news = await this.prismaService.news.create({
      data: {
        date: '2000-11-10',
        views: 0,
        tags: {
          connect: data.tags.map(mapToIdObject),
        },
        users: {
          connect: data.users.map(mapToIdObject),
        },
      },
    });

    return {
      message: NEWS_OK.SUCCESS_CREATION,
      data: {
        ...news,
      },
    };
  }

  async addNewsInfo(
    { id, langCode }: TranslationParamDto,
    { subtitle, text, title }: CreateNewsTranslationBodyDto,
  ) {
    const newsInfo = await this.prismaService.newsTranslation.create({
      data: {
        newsId: id,
        langCode,
        subtitle,
        text,
        title,
      },
    });

    return newsInfo;
  }

  async findAll(skip: number, take: number, id?: number, by?: 'user' | 'tag') {
    switch (by) {
      case 'user':
        return await this.prismaService.news.findMany({
          include: { NewsTranslation: true },
          where: {
            users: {
              some: { id },
            },
          },
          skip,
          take,
        });
      case 'tag':
        return await this.prismaService.news.findMany({
          include: { NewsTranslation: true },
          where: {
            tags: {
              some: { id },
            },
          },
          skip,
          take,
        });
      default:
        return await this.prismaService.news.findMany({
          include: { NewsTranslation: true },
          skip,
          take,
        });
    }
  }

  async findOne(id: number) {
    return await this.prismaService.news.findUnique({
      include: { NewsTranslation: true },
      where: {
        id,
      },
    });
  }

  async update(newsId: number, langCode: string, data: UpdateNewsDto) {
    const updatedNews = await this.prismaService.newsTranslation.update({
      where: { newsId_langCode: { langCode, newsId } },
      data,
    });

    return updatedNews;
  }

  async remove(id: number) {
    return await this.prismaService.news.delete({
      where: { id },
    });
  }
}
