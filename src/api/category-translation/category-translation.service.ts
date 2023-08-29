import { CreateCategoryDto } from '../area/dto/create-category.dto';
import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryTranslationService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async createInfo(id: number, langCode: string, data: CreateCategoryDto) {
        return await this.prismaService.categoryTranslation.create({
            data: { areaId: id, langCode, ...data }
        });
    }

    async updateInfo(categoryTranslationType, langCode, data: UpdateCategoryDto) {
        return await this.prismaService.categoryTranslation.update({
            where: {
                langCode_categoryTranslationType: { categoryTranslationType, langCode }
            },
            data
        })
    }
}
