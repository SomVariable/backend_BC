import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { CreateCategoryDto } from '../area/dto/create-category.dto';
import { PrismaService } from '../database/prisma.service';
import { mapToIdObject } from '../category-translation/constants/category.constants';


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

  async delete(id: number) {
    return await this.prismaService.service.delete({
      where: {id}
    })
  }
}
