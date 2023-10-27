import { S3Service } from './../s3-store/s3-store.service';
import {
  Controller,
  Post,
  Get,
  Delete,
  UploadedFile,
  UseInterceptors,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  ParseFilePipe,
  Res,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PHOTO_TYPE_PATH } from './constants/photo.constants';
import { CreatePhotoBodyDto } from './dto/create-photo.dto';

import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { imageFileFilter } from './helpers/fileFilters.helper';
import { PhotoType } from '@prisma/client';
import { validateFile } from './helpers/fileValidation.helper';
import { Response } from 'express';
import { Readable } from 'stream';

@Controller('photo')
@ApiTags('photo')
@ApiBearerAuth()
@UseGuards(AccessJwtAuthGuard)
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService,
    private readonly s3Service: S3Service,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePhotoBodyDto })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(
    @UploadedFile(new ParseFilePipe(validateFile)) file: Express.Multer.File,
    @Body() body: CreatePhotoBodyDto,
  ) {
    return await this.photoService.create(file, body);
  }

  @Get(`:id/${PHOTO_TYPE_PATH}`)
  async fileInfo(
    @Param('id', ParseIntPipe) id: number,
    @Param('photoType') photoType: PhotoType,
    @Res() res: Response,
  ) {
    const fileInfo = await this.photoService.findOne(id, photoType);
    const response = await this.s3Service.getFile(fileInfo?.fileName);
    const stream = Readable.from(response.Body as any);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileInfo.fileName}"`,
    );

    return stream.pipe(res);
  }

  @Get(`:id/${PHOTO_TYPE_PATH}/file-info`)
  async getFileInfo(
    @Param('id', ParseIntPipe) id: number,
    @Param('photoType') photoType: PhotoType,
  ) {
    return await this.photoService.findOne(id, photoType);
  }

  @Delete(`:id/${PHOTO_TYPE_PATH}`)
  async deleteFileInfo(
    @Param('id', ParseIntPipe) id: number,
    @Param('photoType') photoType: PhotoType,
  ) {
    return await this.photoService.remove(id, photoType);
  }
}
