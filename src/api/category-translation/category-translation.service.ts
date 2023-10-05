import { CreateCategoryDto } from '../area/dto/create-category.dto';
import { PrismaService } from './../database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CATEGORY_INFO_NOT_FOUND } from './constants/category.constants';

@Injectable()
export class CategoryTranslationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createInfo(id: number, langCode: string, data: CreateCategoryDto) {
    switch(data.categoryTranslationType){
      case 'AREA':
        return await this.prismaService.categoryTranslation.create({
          data: { areaId: id, langCode, relatedId: id, ...data },
        });
      case 'PRACTICE':
        return await this.prismaService.categoryTranslation.create({
          data: { practiceId: id, langCode, relatedId: id, ...data },
        });
      case 'SERVICE':
        return await this.prismaService.categoryTranslation.create({
          data: { serviceId: id, langCode, relatedId: id, ...data },
        });
    }
  }

  async updateInfo(
    relatedId: number,
    categoryTranslationType,
    langCode,
    data: UpdateCategoryDto,
  ) {
    const categoryTranslation =
      await this.prismaService.categoryTranslation.findUnique({
        where: {
          langCode_relatedId_categoryTranslationType: {
            categoryTranslationType,
            langCode,
            relatedId,
          },
        },
      });

    if (!categoryTranslation) {
      throw new NotFoundException(
        CATEGORY_INFO_NOT_FOUND.MISSING_CATEGORY_INFO,
      );
    }

    return await this.prismaService.categoryTranslation.update({
      where: {
        langCode_relatedId_categoryTranslationType: {
          categoryTranslationType,
          langCode,
          relatedId,
        },
      },
      data,
    });
  }
}
