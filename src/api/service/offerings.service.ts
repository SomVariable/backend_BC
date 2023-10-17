import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { PrismaService } from '../database/prisma.service';
import {
  Offer_NOT_FOUND,
  ServiceIncludeTranslation,
  ServiceIncludePractice,
  Offer_BAD_REQUEST,
} from './constants/offer.constants';
import { mapToIdObject } from 'src/common/helpers/map-to-id-object.helper';

@Injectable()
export class OfferingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ practicesIds }: CreateOfferDto) {
    return await this.prismaService.service.create({
      data: {
        practicesIds: {
          connect: practicesIds.map(mapToIdObject),
        },
      },
    });
  }

  async getOffer(id: number) {
    const offer = await this.prismaService.service.findFirst({
      include: { ...ServiceIncludeTranslation },
      where: { id },
    });

    if (!offer) {
      throw new NotFoundException(Offer_NOT_FOUND.MISSING_Offer);
    }

    return offer;
  }

  async getOfferWithFullData(id: number) {
    return await this.prismaService.service.findFirst({
      include: {
        ...ServiceIncludeTranslation,
        ...ServiceIncludePractice,
      },
    });
  }

  async getOfferings() {
    return await this.prismaService.service.findMany({
      include: { ...ServiceIncludeTranslation },
    });
  }

  async update(id: number, data: UpdateOfferDto) {
    const offer = await this.prismaService.service.findFirst({
      include: {
        ...ServiceIncludePractice,
      },
      where: { id },
    });

    if (!offer) {
      throw new NotFoundException(Offer_NOT_FOUND.MISSING_Offer);
    }

    if (!data || !data.practicesIds || !Array.isArray(data.practicesIds)) {
      throw new BadRequestException(Offer_BAD_REQUEST.UPDATE);
    }

    const oldIds = [...offer.practicesIds].map((offer) => offer.id);

    return await this.prismaService.service.update({
      include: {
        ...ServiceIncludeTranslation,
        ...ServiceIncludePractice,
      },
      where: { id },
      data: {
        practicesIds: {
          set: [...oldIds, ...data.practicesIds].map(mapToIdObject),
        },
      },
    });
  }

  async delete(id: number) {
    const offer = await this.prismaService.service.findFirst({ where: { id } });

    if (!offer) {
      throw new NotFoundException(Offer_NOT_FOUND.MISSING_Offer);
    }

    return await this.prismaService.service.delete({
      where: { id },
    });
  }

  async deleteMany() {
    return await this.prismaService.service.deleteMany({});
  }
}
