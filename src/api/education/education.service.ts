import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { CreateEducationInfoDto } from './dto/create-education-info.dto';
import { UpdateEducationInfoDto } from './dto/update-education-info.dto';

@Injectable()
export class EducationService {

  constructor(
    private prismaService: PrismaService
  ) {}

  async create(userId, data: CreateEducationDto) {
    return await this.prismaService.education.create({ 
      data: {...data, userId}
    });
  }

  async createInfo(educationId, langCode, data: CreateEducationInfoDto) {
    return await this.prismaService.educationTranslation.create({
      data: {educationId, langCode, ...data}
    })
  }

  async update(userId: number, id: number, data: UpdateEducationDto) {
    return await this.prismaService.education.update({
      where: {
        id,
        AND: [{id}, {userId}]
      },
      data
    });
  }

  async updateInfo(educationId, langCode, data: UpdateEducationInfoDto) {
    return await this.prismaService.educationTranslation.update({
      where: {
        langCode_educationId: {educationId, langCode}
      },
      data
    })
  }

  async findAll(userId: number) {
    return await this.prismaService.education.findMany({
      include: {educationInfo: true},
      where: {userId}
    });
  }

  async findOne(id: number, userId: number) {
    return await this.prismaService.education.findFirst({
      where: {
        id, 
        AND: [{id}, {userId}]
      }
    });
  }

  async remove(userId: number, id: number) {
    return await this.prismaService.education.delete({
      where: {
        id,
        AND: [{id}, {userId}]
      }
    });
  }
}


