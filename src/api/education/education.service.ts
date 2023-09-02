import { PrismaService } from './../database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { CreateEducationInfoDto } from './dto/create-education-info.dto';
import { UpdateEducationInfoDto } from './dto/update-education-info.dto';
import { EDUCATION_NOT_FOUND } from './constants/education.constants';

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
    const education = await this.findOne(educationId)

    if(!education) {
      throw new NotFoundException(EDUCATION_NOT_FOUND.MISSING_EDUCATION)
    }

    return await this.prismaService.educationTranslation.create({
      data: {educationId, langCode, ...data}
    })
  }

  async update(id: number, data: UpdateEducationDto) {
    const education = await this.findOne(id)

    if(!education) {
      throw new NotFoundException(EDUCATION_NOT_FOUND.MISSING_EDUCATION)
    }

    return await this.prismaService.education.update({
      where: {
        id
      },
      data
    });
  }

  async updateInfo(educationId, langCode, data: UpdateEducationInfoDto) {
    const educationInfo = await this.prismaService.educationTranslation.findUnique({
      where: {
        langCode_educationId: {educationId, langCode}
      }
    })

    if(!educationInfo) {
      throw new NotFoundException(EDUCATION_NOT_FOUND.MISSING_EDUCATION)
    }

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

  async findOne(id: number) {
    return await this.prismaService.education.findFirst({
      where: {
        id
      }
    });
  }

  async remove( id: number) {
    return await this.prismaService.education.delete({
      where: {
        id
      }
    });
  }
}


