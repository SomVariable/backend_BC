import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserProfileService {

  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async create(userId: number, createUserProfileDto: CreateUserProfileDto) {
    return await this.prismaService.userTranslation.create({
      data: {
        ...createUserProfileDto,
        userId
      }
    }) 
  }

  async findAll(userId: number) { 
    return await this.prismaService.userTranslation.findMany({
      where: {userId}
    });
  }

  async findOne(userId: number, langCode: string) {
    return await this.prismaService.userTranslation.findUnique({
      where: { 
        langCode_userId: {langCode, userId}
      }
    });
  }

  async update(userId: number, updateUserProfileDto: UpdateUserProfileDto, langCode: string) {
    return await this.prismaService.userTranslation.update({
      where: { 
        langCode_userId: {langCode, userId}
      },
      data: {
        ...updateUserProfileDto
      }
    });
  }

}
