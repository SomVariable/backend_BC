import { PrismaService } from './../database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfessionalInterestDto } from './dto/create-professional-interest.dto';
import { UpdateProfessionalInterestDto } from './dto/update-professional-interest.dto';
import { P_INTEREST_NOT_FOUND } from './constants/professional-interest.constants';

@Injectable()
export class ProfessionalInterestService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }


  async create(userId: number) {
    return await this.prismaService.professionalInterest.create({
      data: {
        userId
      }
    });
  }

  async createInfo(
    professionalInterestId: number,
    langCode: string,
    createProfessionalInterestDto: CreateProfessionalInterestDto) {

    const professionalInterest = await this.findOne(professionalInterestId)

    if (!professionalInterest) {
      throw new NotFoundException(P_INTEREST_NOT_FOUND.MISSING_P_INTEREST)
    }
    
    return await this.prismaService.professionalInterestTranslation.create({
      data: { professionalInterestId, langCode, ...createProfessionalInterestDto }
    });
  }

  async updateInfo(
    professionalInterestId: number,
    langCode: string,
    data: UpdateProfessionalInterestDto) {
    const professionalInterestInfo = await this.prismaService.professionalInterestTranslation
      .findUnique({
        where: {
          professionalInterestId_langCode: { professionalInterestId, langCode }
        }
      })

    if (!professionalInterestInfo) {
      throw new NotFoundException(P_INTEREST_NOT_FOUND.MISSING_P_INTEREST_INFO)
    }

    return await this.prismaService.professionalInterestTranslation.update({
      where: {
        professionalInterestId_langCode: { langCode, professionalInterestId }
      },
      data
    });
  }

  async findAll(userId: number) {
    return await this.prismaService.professionalInterest.findMany({
      include: { ProfessionalInterestTranslation: true },
      where: { userId }
    });
  }


  async findOne(id: number) {
    return await this.prismaService.professionalInterest.findFirst({
      include: { ProfessionalInterestTranslation: true },
      where: {
        id
      }
    });
  }

  async remove(id: number) {
    const professionalInterest = await this.findOne(id)

    if (!professionalInterest) {
      throw new NotFoundException(P_INTEREST_NOT_FOUND.MISSING_P_INTEREST)
    }

    return await this.prismaService.professionalInterest.delete({
      where: { id }
    });
  }
}
