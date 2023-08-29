import { Injectable } from '@nestjs/common';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { mapToIdObject } from '../area/constants/area.constants';
import { CreateCategoryDto } from '../area/dto/create-category.dto';
import { UpdateCategoryDto } from '../area/dto/update-category.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PracticeService {

  constructor(
    private readonly prismaService: PrismaService
  ){}

  async create({areasIds, servicesIds}: CreatePracticeDto) {
    return await this.prismaService.practice.create({
      data: {
        areasId: {
          connect: areasIds.map(mapToIdObject)
        },
        servicesIds: {
          connect: servicesIds.map(mapToIdObject)
        }
      }
    });
  }

  async createInfo(id: number, langCode: string, data: CreateCategoryDto) {
    return await this.prismaService.categoryTranslation.create({
      data: { practiceId: id, langCode, ...data}
    });
  }

  async getPractice(id: number) {
    return await this.prismaService.practice.findFirst({
      include: {CategoryTranslation: true},
      where: {id}
    })
  }

  async getPractices() {
    return await this.prismaService.practice.findMany({})
  }

  async update(id: number, data: UpdatePracticeDto) {
    return await this.prismaService.practice.update({
      where: {id},
      data: {
        areasId: {
          set: data?.areasIds.map(mapToIdObject)
        },
        servicesIds: {
          set: data?.servicesIds.map(mapToIdObject)
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
    return await this.prismaService.practice.delete({
      where: {id}
    })
  }
}
