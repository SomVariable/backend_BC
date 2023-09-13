import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { CreateCategoryDto } from '../area/dto/create-category.dto';
import { PrismaService } from '../database/prisma.service';
import { Offer_NOT_FOUND } from './constants/offer.constants';
import { mapToIdObject } from 'src/common/helpers/map-to-id-object.helper';


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
    const offer = await this.prismaService.service.findFirst({where: {id}})

    if(!offer){
      throw new NotFoundException(Offer_NOT_FOUND.MISSING_Offer)
    }

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
    const offer = await this.prismaService.service.findFirst({where: {id}})

    if(!offer){
      throw new NotFoundException(Offer_NOT_FOUND.MISSING_Offer)
    }
    
    return await this.prismaService.service.delete({
      where: {id}
    })
  }
}
