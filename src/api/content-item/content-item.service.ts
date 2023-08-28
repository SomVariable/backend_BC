import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateContentItemDto } from './dto/create-content-item.dto';
import { UpdateContentItemDto } from './dto/update-content-item.dto';
import { CreateContentItemInfoDto } from './dto/create-content-item-info.dto';
import { UpdateContentItemInfoDto } from './dto/update-content-item-info.dto';
import { ContentItemIncludeTranslation } from './constants/content-item.constants';

@Injectable()
export class ContentItemService {
  constructor(
    private readonly prismaService: PrismaService
  ){}
  
  async create(data: CreateContentItemDto) {
    return await this.prismaService.contentItem.create({
      data: {
        ...data
      }
    });
  }

  async createInfo(contentItemId: number, langCode: string, data: CreateContentItemInfoDto) {
    return await this.prismaService.contentItemTranslation.create({
      data: {
        contentItemId,
        langCode,
       ...data
      }
    });
  }

  async update(id: number, data: UpdateContentItemDto) {
    return await this.prismaService.contentItem.update({
      where: {id},
      data
    });
  }

  async updateInfo(contentItemId: number, langCode: string, data: UpdateContentItemInfoDto) {
    return await this.prismaService.contentItemTranslation.update({
      where: {
        langCode_contentItemId: {contentItemId, langCode}
      },
      data
    });
  }

  async getContentItem(id: number){
    return await this.prismaService.contentItem.findFirst({
      include: {...ContentItemIncludeTranslation},
      where: {
        id
      }
    })
  }

  async getContentItems(userId: number){
    return await this.prismaService.contentItem.findMany({
      where: {
        User: {
          some: {id: userId}
        }
      }
    })
  }

  async deleteContentItem(id: number){
    return await this.prismaService.contentItem.delete({
      where: {
        id
      }
    })
  }
}
