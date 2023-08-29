import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { UpdateCategoryDto } from '../area/dto/update-category.dto';
import { UpdatePracticeDto } from '../practice/dto/update-practice.dto';
import { mapToIdObject } from '../area/constants/area.constants';
import { CreateCategoryDto } from '../area/dto/create-category.dto';
import { PrismaService } from '../database/prisma.service';


@Injectable()
export class OfferingsService {
  constructor(
    private readonly prismaService: PrismaService
  ){}

  async create({practicesIds}: CreateOfferDto) {
    return await this.prismaService.service.create({
      data: {
        practicesIds: {
          connect: practicesIds.map(mapToIdObject)
        }
      }
    });
  }

  async createInfo(id: number, langCode: string, data: CreateCategoryDto) {
    return await this.prismaService.categoryTranslation.create({
      data: { serviceId: id, langCode, ...data}
    });
  }

  async getOffer(id: number) {
    return await this.prismaService.service.findFirst({
      include: {CategoryTranslation: true},
      where: {id}
    })
  }

  async getOfferings() {
    return await this.prismaService.service.findMany({})
  }

  async update(id: number, data: UpdateOfferDto) {
    return await this.prismaService.service.update({
      where: {id},
      data: {
        practicesIds: {
          set: data?.practicesIds.map(mapToIdObject)
        }
      }
    })
  }

  async updateInfo(categoryTranslationType, langCode, data: UpdateCategoryDto){
    return await this.prismaService.categoryTranslation.update({
      where: {
        langCode_categoryTranslationType: {categoryTranslationType, langCode}
      },
      data
    })
  }

  async delete(id: number) {
    return await this.prismaService.service.delete({
      where: {id}
    })
  }
}
