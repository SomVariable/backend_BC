import { PrismaService } from './../database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { CreateTagInfoDto } from './dto/create-tag-info';
import { UpdateTagInfoDto } from './dto/update-tag-info';
import {
  TAG_NOT_FOUND,
  strToTag,
  TagIncludeTranslation,
  TagIncludeContentItem,
} from './constants/tag.constants';
import { GetTagDto } from './dto/get-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateTagDto) {
    return await this.prismaService.tag.create({
      data,
    });
  }

  async createInfo(tagId: number, langCode: string, data: CreateTagInfoDto) {
    const tag = await this.getTag(tagId);

    if (!tag) {
      throw new NotFoundException(TAG_NOT_FOUND.MISSING_TAG);
    }

    return await this.prismaService.tagTranslation.create({
      data: {
        tagId,
        langCode,
        tag: strToTag(data.tag),
        ...data,
      },
    });
  }

  async getTag(id: number) {
    return await this.prismaService.tag.findFirst({
      include: { ...TagIncludeTranslation },
      where: { id },
    });
  }

  async getTags(take: number, skip: number, where: GetTagDto) {
    return await this.prismaService.tag.findMany({
      include: { ...TagIncludeTranslation },
      where,
      skip,
      take,
    });
  }

  async getLatest(practiceId: number) {
    return await this.prismaService.tag.findMany({
      include: {
        ...TagIncludeContentItem,
        ...TagIncludeTranslation,
      },
      where: {
        practiceId,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 3,
    });
  }

  async tagsCount() {
    return await this.prismaService.tag.count();
  }

  async updateTagInfo(tagId: number, langCode: string, data: UpdateTagInfoDto) {
    const tagInfo = await this.prismaService.tagTranslation.findUnique({
      where: {
        langCode_tagId: { tagId, langCode },
      },
    });

    if (!tagInfo) {
      throw new NotFoundException(TAG_NOT_FOUND.MISSING_TAG_INFO);
    }

    return await this.prismaService.tagTranslation.update({
      where: { langCode_tagId: { tagId, langCode } },
      data: {
        tag: strToTag(data.tag),
        ...data,
      },
    });
  }

  async delete(id: number) {
    const tag = await this.getTag(id);

    if (!tag) {
      throw new NotFoundException(TAG_NOT_FOUND.MISSING_TAG);
    }

    return await this.prismaService.tag.delete({
      where: { id },
    });
  }
}
