import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { mapToIdObject } from './constants/area.constants';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class AreaService {

  constructor(
    private readonly prismaService: PrismaService
  ){}

  async create({practicesIds}: CreateAreaDto) {
    return await this.prismaService.area.create({
      data: {
        practicesIds: {
          connect: practicesIds.map(mapToIdObject)
        }
      }
    });
  }

  async createInfo(id: number, langCode: string, data: CreateCategoryDto) {
    return await this.prismaService.categoryTranslation.create({
      data: { areaId: id, langCode, ...data}
    });
  }

  async getArea(id: number) {
    return await this.prismaService.area.findFirst({
      include: {CategoryTranslation: true},
      where: {id}
    })
  }

  async getAreas() {
    return await this.prismaService.area.findMany({})
  }

  async update(id: number, data: UpdateAreaDto) {
    return await this.prismaService.area.update({
      where: {id},
      data:{
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
    return await this.prismaService.area.delete({
      where: {id}
    })
  }
}
