import { PrismaService } from './../database/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import {
  AREA_NOT_FOUND,
  AreaIncludeTranslation,
  AreaIncludePractices,
} from './constants/area.constants';
import { mapToIdObject } from 'src/common/helpers/map-to-id-object.helper';
import { Offer_BAD_REQUEST } from '../service/constants/offer.constants';

@Injectable()
export class AreaService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ practicesIds }: CreateAreaDto) {
    return await this.prismaService.area.create({
      data: {
        practicesIds: {
          connect: practicesIds.map(mapToIdObject),
        },
      },
    });
  }

  async getArea(id: number) {
    const area = await this.prismaService.area.findFirst({
      include: { CategoryTranslation: true },
      where: { id },
    });

    if (!area) {
      throw new NotFoundException(AREA_NOT_FOUND.MISSING_AREA);
    }

    return area;
  }

  async getAreaWithFullData(id: number) {
    const area = await this.prismaService.area.findFirst({
      include: {
        ...AreaIncludeTranslation,
        ...AreaIncludePractices,
      },
      where: { id },
    });

    if (!area) {
      throw new NotFoundException(AREA_NOT_FOUND.MISSING_AREA);
    }

    return area;
  }

  async getAreas(take: number, skip: number) {
    return await this.prismaService.area.findMany({
      skip,
      take,
    });
  }

  async update(id: number, data: UpdateAreaDto) {
    const area = await this.getAreaWithFullData(id);

    if (!area) {
      throw new NotFoundException(AREA_NOT_FOUND.MISSING_AREA);
    }

    return await this.prismaService.area.update({
      include: {
        ...AreaIncludeTranslation,
        ...AreaIncludePractices,
      },
      where: {
        id,
      },
      data: {
        practicesIds: {
          set: data?.practicesIds.map(mapToIdObject),
        },
      },
    });
  }

  async addArea(id: number, data: UpdateAreaDto) {
    const area = await this.getAreaWithFullData(id);

    if (!area) {
      throw new NotFoundException(AREA_NOT_FOUND.MISSING_AREA);
    }

    if (!data || !data.practicesIds || !Array.isArray(data.practicesIds)) {
      throw new BadRequestException(Offer_BAD_REQUEST.UPDATE);
    }

    const oldIds = [...area.practicesIds].map((offer) => offer.id);

    return await this.prismaService.area.update({
      include: {
        ...AreaIncludeTranslation,
        ...AreaIncludePractices,
      },
      where: {
        id,
      },
      data: {
        practicesIds: {
          set: [...oldIds, ...data.practicesIds].map(mapToIdObject),
        },
      },
    });
  }

  async deleteArea(id: number, data: UpdateAreaDto) {
    const area = await this.getAreaWithFullData(id);

    if (!area) {
      throw new NotFoundException(AREA_NOT_FOUND.MISSING_AREA);
    }

    return await this.prismaService.area.update({
      include: {
        ...AreaIncludeTranslation,
        ...AreaIncludePractices,
      },
      where: {
        id,
      },
      data: {
        practicesIds: {
          delete: data.practicesIds.map(mapToIdObject),
        },
      },
    });
  }

  async delete(id: number) {
    const area = await this.getArea(id);

    if (!area) {
      throw new NotFoundException(AREA_NOT_FOUND.MISSING_AREA);
    }

    return await this.prismaService.area.delete({
      where: { id },
    });
  }

  async deleteMany() {
    return await this.prismaService.area.deleteMany({});
  }
}
