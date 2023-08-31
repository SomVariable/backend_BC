import { Injectable } from '@nestjs/common';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { PrismaService } from '../database/prisma.service';
import { mapToIdObject } from '../category-translation/constants/category.constants';

@Injectable()
export class PracticeService {

  constructor(
    private readonly prismaService: PrismaService
  ){}

  async create({areasIds, servicesIds}: CreatePracticeDto) {
    return await this.prismaService.practice.create({
      data: {
        areasIds: {
          connect: areasIds.map(mapToIdObject)
        },
        servicesIds: {
          connect: servicesIds.map(mapToIdObject)
        }
      }
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
        areasIds: {
          set: data?.servicesIds.map(mapToIdObject)
        },
        servicesIds: {
          set: data?.servicesIds.map(mapToIdObject)
        }
      }
    })
  }

  async delete(id: number) {
    return await this.prismaService.practice.delete({
      where: {id}
    })
  }
}
