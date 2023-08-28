import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProfessionalInterestDto } from './dto/create-professional-interest.dto';
import { UpdateProfessionalInterestDto } from './dto/update-professional-interest.dto';

@Injectable()
export class ProfessionalInterestService {
  constructor(
    private readonly prismaService: PrismaService
  ){}
  
  
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
    return await this.prismaService.professionalInterestTranslation.create({
      data: {professionalInterestId, langCode, ...createProfessionalInterestDto}
    });
  }
  // add user check 
  async updateInfo(professionalInterestId: number, langCode: string,  data: UpdateProfessionalInterestDto) {
    return await this.prismaService.professionalInterestTranslation.update( {
      where: {
        professionalInterestId_langCode: {langCode, professionalInterestId}
      },
      data
    } );
  }

  async findAll(userId: number) {
    return await this.prismaService.professionalInterest.findMany({
      include: {ProfessionalInterestTranslation: true},
      where: {userId}
    });
  }

  // add user check 
  async findOne(id: number) {
    return await this.prismaService.professionalInterest.findFirst({
      include: {ProfessionalInterestTranslation: true},
      where: {
        id
      }
    });
  }

  // add user check 
  async remove(id: number) {
    return await this.prismaService.professionalInterest.delete({
      where: {id}
    });
  }
}
