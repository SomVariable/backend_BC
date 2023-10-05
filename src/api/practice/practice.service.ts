import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { PrismaService } from '../database/prisma.service';
import { PRACTICE_NOT_FOUND, PracticeIncludeTranslation, PracticeIncludePractices } from './constants/practice.constants';
import { mapToIdObject } from 'src/common/helpers/map-to-id-object.helper';

@Injectable()
export class PracticeService {
  constructor(private readonly prismaService: PrismaService) { }

  async create({ areasIds, servicesIds }: CreatePracticeDto) {
    return await this.prismaService.practice.create({
      data: {
        areasIds: {
          connect: areasIds.map(mapToIdObject),
        },
        servicesIds: {
          connect: servicesIds.map(mapToIdObject),
        },
      },
    });
  }

  async getPractice(id: number) {
    return await this.prismaService.practice.findFirst({
      include: { ...PracticeIncludeTranslation },
      where: { id },
    });
  }

  async getPracticeFull(id: number) {
    return await this.prismaService.practice.findFirst({
      include: {
        ...PracticeIncludeTranslation,
        ...PracticeIncludePractices
      },
      where: { id },
    });
  }

  async getPractices(skip: number, take: number) {
    return await this.prismaService.practice.findMany({
      include: { ...PracticeIncludeTranslation },
      skip,
      take,
    });
  }

  async update(id: number, data: UpdatePracticeDto) {
    const practice = await this.getPractice(id);
    
    if (!practice) {
      throw new NotFoundException(PRACTICE_NOT_FOUND.MISSING_PRACTICE);
    }

    return await this.prismaService.practice.update({
      include: {
        ...PracticeIncludeTranslation,
        ...PracticeIncludePractices
      },
      where: { id },
      data: {
        areasIds: {
          set: data?.areasIds.map(mapToIdObject),
        },
        servicesIds: {
          set: data?.servicesIds.map(mapToIdObject),
        },
      },
    });
  }

  async delete(id: number) {
    const practice = await this.getPractice(id);

    if (!practice) {
      throw new NotFoundException(PRACTICE_NOT_FOUND.MISSING_PRACTICE);
    }

    return await this.prismaService.practice.delete({
      where: { id },
    });
  }

  async deleteMany() {
    return await this.prismaService.practice.deleteMany();
  }
}
