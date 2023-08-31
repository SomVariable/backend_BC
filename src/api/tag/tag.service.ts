import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { CreateTagInfoDto } from './dto/create-tag-info';
import { UpdateTagInfoDto } from './dto/update-tag-info';

@Injectable()
export class TagService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async create(data: CreateTagDto) {
        return await this.prismaService.tag.create({
            data
        }) 
    }

    async createInfo(tagId:number, langCode: string, data: CreateTagInfoDto) {
        return await this.prismaService.tagTranslation.create({
            data: {tagId, langCode, ...data}
        }) 
    }

    async getTag(id: number) {
        return await this.prismaService.tag.findFirst( {
            include: {TagTranslation: true},
            where: {id}
        } ) 
    }

    async getTags() {
        return await this.prismaService.tag.findMany( {
            include: {TagTranslation: true},
        } ) 
    }

    async updateTagInfo(tagId: number, langCode: string, data: UpdateTagInfoDto) {
        return await this.prismaService.tagTranslation.update({
            where: {langCode_tagId: {tagId, langCode}},
            data
        })
    }

    async delete(id: number) {
        return await this.prismaService.tag.delete( {
            where: {id}
        } ) 
    }
}
