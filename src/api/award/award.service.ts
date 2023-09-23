import { PrismaService } from './../database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';
import { AWARD_NOT_FOUND } from './constants/award.constants';

@Injectable()
export class AwardService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number) {
    return await this.prismaService.award.create({
      data: { userId },
    });
  }

  async createInfo(
    awardId: number,
    langCode: string,
    createAwardDto: CreateAwardDto,
  ) {
    const award = await this.getAward(awardId);

    if (!award) {
      throw new NotFoundException(AWARD_NOT_FOUND.MISSING_AWARD);
    }

    return await this.prismaService.awardTranslation.create({
      data: {
        awardId,
        langCode,
        ...createAwardDto,
      },
    });
  }

  async getAwardInfo(awardId: number, langCode: string) {
    return await this.prismaService.awardTranslation.findUnique({
      where: {
        awardId_langCode: { awardId, langCode },
      },
    });
  }

  async updateInfo(awardId: number, langCode: string, data: UpdateAwardDto) {
    const awardInfo = await this.getAwardInfo(awardId, langCode);

    if (!awardInfo) {
      throw new NotFoundException(AWARD_NOT_FOUND.MISSING_AWARD_INFO);
    }

    return await this.prismaService.awardTranslation.update({
      where: {
        awardId_langCode: { awardId, langCode },
      },
      data,
    });
  }

  async getAward(id: number) {
    return await this.prismaService.award.findFirst({
      include: { AwardTranslation: true },
      where: { id },
    });
  }

  async getAwardByLang(id: number, langCode: string) {
    return await this.prismaService.award.findFirst({
      include: { AwardTranslation: { where: { langCode } } },
      where: { id },
    });
  }

  async getAwards(id: number) {
    return await this.prismaService.award.findFirst({
      include: { AwardTranslation: true },
      where: { id },
    });
  }

  async getAwardsByLang(
    id: number,
    langCode: string,
    skip: number,
    take: number,
  ) {
    return await this.prismaService.award.findFirst({
      include: { AwardTranslation: { where: { langCode } } },
      where: { id },
      skip,
      take,
    });
  }

  async delete(id: number) {
    return await this.prismaService.award.delete({
      where: { id },
    });
  }
}
