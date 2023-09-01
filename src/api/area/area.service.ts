import { PrismaService } from './../database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from '../category-translation/dto/update-category.dto';
import { mapToIdObject } from '../category-translation/constants/category.constants';
import { AREA_NOT_FOUND } from './constants/area.constants';

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
    const area = await this.getArea(id)

    if( !area ){
      throw new NotFoundException( AREA_NOT_FOUND.MISSING_AREA )
    }

    return await this.prismaService.area.update({
      where: {id},
      data:{
        practicesIds: {
          set: data?.practicesIds.map(mapToIdObject)
        }
      }
    })
  }

  async delete(id: number) {
    const area = await this.getArea(id)

    if( !area ){
      throw new NotFoundException( AREA_NOT_FOUND.MISSING_AREA )
    }

    return await this.prismaService.area.delete({
      where: {id}
    })
  }
}
