import { PrismaService } from './../database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentItemDto } from './dto/create-content-item.dto';
import { UpdateContentItemDto } from './dto/update-content-item.dto';
import { CreateContentItemInfoDto } from './dto/create-content-item-info.dto';
import { UpdateContentItemInfoDto } from './dto/update-content-item-info.dto';
import {
  CONTENT_ITEM_NOT_FOUND,
  ContentItemIncludeTranslation,
} from './constants/content-item.constants';

@Injectable()
export class ContentItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateContentItemDto) {
    return await this.prismaService.contentItem.create({
      data: {
        ...data,
      },
    });
  }

  async createInfo(
    contentItemId: number,
    langCode: string,
    data: CreateContentItemInfoDto,
  ) {
    const contentItem = await this.getContentItem(contentItemId);

    if (!contentItem) {
      throw new NotFoundException(CONTENT_ITEM_NOT_FOUND.MISSING_CONTENT_ITEM);
    }

    return await this.prismaService.contentItemTranslation.create({
      data: {
        contentItemId,
        langCode,
        ...data,
      },
    });
  }

  async update(id: number, data: UpdateContentItemDto) {
    const contentItem = await this.getContentItem(id);

    if (!contentItem) {
      throw new NotFoundException(CONTENT_ITEM_NOT_FOUND.MISSING_CONTENT_ITEM);
    }

    return await this.prismaService.contentItem.update({
      where: { id },
      data,
    });
  }

  async updateInfo(
    contentItemId: number,
    langCode: string,
    data: UpdateContentItemInfoDto,
  ) {
    const contentItem =
      await this.prismaService.contentItemTranslation.findUnique({
        where: {
          langCode_contentItemId: { contentItemId, langCode },
        },
      });

    if (!contentItem) {
      throw new NotFoundException(CONTENT_ITEM_NOT_FOUND.MISSING_CONTENT_ITEM);
    }

    return await this.prismaService.contentItemTranslation.update({
      where: {
        langCode_contentItemId: { contentItemId, langCode },
      },
      data,
    });
  }

  async getContentItem(id: number) {
    const contentItem = await this.prismaService.contentItem.findFirst({
      include: { ...ContentItemIncludeTranslation },
      where: {
        id,
      },
    });

    if (!contentItem) {
      throw new NotFoundException(CONTENT_ITEM_NOT_FOUND.MISSING_CONTENT_ITEM);
    }

    return contentItem;
  }

  async getContentItems(userId: number, skip: number, take: number) {
    return await this.prismaService.contentItem.findMany({
      where: {
        User: {
          some: { id: userId },
        },
      },
      skip,
      take,
    });
  }

  async deleteContentItem(id: number) {
    await this.getContentItem(id);

    return await this.prismaService.contentItem.delete({
      where: {
        id,
      },
    });
  }

  async drop() {
    return await this.prismaService.contentItem.deleteMany();
  }
}
