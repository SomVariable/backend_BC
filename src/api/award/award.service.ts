import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';

@Injectable()
export class AwardService {
  
  constructor(
    private readonly prismaService: PrismaService
  ){}
  
  async create(userId: number) {
    return await this.prismaService.award.create({
      data: {userId}
    });
  }

  async createInfo(awardId: number, langCode: string, createAwardDto: CreateAwardDto) {
    return await this.prismaService.awardTranslation.create({
      data: {
        awardId,
        langCode, 
        ...createAwardDto,
      }
    });
  }

  async updateInfo(awardId: number, langCode: string, data: UpdateAwardDto) {
    return await this.prismaService.awardTranslation.update({
      where: {
        awardId_langCode: {awardId, langCode}
      },
      data
    })
  }

  async getAward(id: number) {
    return await this.prismaService.award.findFirst({
      include: {AwardTranslation: true},
      where: {id}
     })
  }

  async getAwardByLang(id: number, langCode: string) {
    return await this.prismaService.award.findFirst({
      include: {AwardTranslation: {where: {langCode}}},
      where: {id}
     })
  }

  async getAwards(id: number) {
    return await this.prismaService.award.findFirst({
      include: {AwardTranslation: true},
      where: {id}
     })
  }

  async getAwardsByLang(id: number, langCode: string) {
    return await this.prismaService.award.findFirst({
      include: {AwardTranslation: {where: {langCode}}},
      where: {id}
     })
  }

  async delete(id: number) {
    return await this.prismaService.award.delete({
      where: {id}
    })
  }
}
