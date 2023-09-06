import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid'
import { S3Service } from '../s3-store/s3-store.service';
import { CreatePhotoBodyDto } from './dto/create-photo.dto';
import { PhotoType } from '@prisma/client';
import { PHOTO_NOT_FOUND } from './constants/photo.constants';
import { PrismaService } from '../database/prisma.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Injectable()
export class PhotoService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly s3Service: S3Service
    ) { }

    createFileName(originalname: string) {
        return `${uuidv4()}${extname(originalname)}`
    }

    async create(
        file: Express.Multer.File,
        data: CreatePhotoBodyDto
    ) {
        const { mimetype, originalname, size } = file

        const fileName = this.createFileName(originalname)
        await this.s3Service.uploadFile(fileName, file)

        return this.prismaService.photo.create({
            data: {
                fileName: fileName,
                mimetype,
                originalName: originalname,
                size,
                ...data
            }
        })
    }

    async findAll(
        itemId: number,
        type: PhotoType
    ) {
        return await this.prismaService.photo.findMany({
            where: {
                OR: [
                    {
                        AND: [
                            { contentItemId: itemId },
                            { type }
                        ]
                    },
                    {
                        AND: [
                            { userId: itemId },
                            { type }
                        ]
                    }
                ]
            }
        })
    }

    async findOne(
        itemId: number,
        type: PhotoType
    ) {
        return await this.prismaService.photo.findUnique({
            where: { itemId_type: {itemId, type} },

        })
    }

    async remove(itemId: number, type: PhotoType) {
        const photoInfo = await this.findOne(itemId, type)

        if(!photoInfo) {
            throw new NotFoundException(PHOTO_NOT_FOUND.MISSING_PHOTO_INFO)
        }

        return await this.prismaService.photo.delete({
            where: { itemId_type: {
                itemId,
                type
            } }
        })
    }

}
