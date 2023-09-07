import { Controller, Post, Get, Delete, UploadedFile, UseInterceptors, Body, Param, UseGuards, ParseIntPipe, ParseFilePipe } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { API_FILE_CONFIG, PHOTO_TYPE_PATH } from './constants/photo.constants';
import { CreatePhotoBodyDto } from './dto/create-photo.dto';
import { ID_PARAM } from 'src/common/constants/app.constants';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { imageFileFilter } from './helpers/fileFilters.helper';
import { PhotoType } from '@prisma/client';
import { validateFile } from './helpers/fileValidation.helper';

@Controller('photo')
@ApiTags("photo")
@ApiBearerAuth()
@UseGuards(AccessJwtAuthGuard)
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: CreatePhotoBodyDto})
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: imageFileFilter
  }))
  async uploadFile(
    @UploadedFile(new ParseFilePipe(validateFile)) file: Express.Multer.File,
    @Body() body: CreatePhotoBodyDto
  ){
    return await this.photoService.create(file, body)
  }

  @Get(`${ID_PARAM}/:photoType`)
  async getFileInfo(
    @Param("id", ParseIntPipe) id: number,
    @Param("photoType") photoType: PhotoType
  ){
    return await this.photoService.findOne(id, photoType)
  }
  
  @Delete(`${ID_PARAM}/${PHOTO_TYPE_PATH}`)
  async deleteFileInfo(
    @Param("id", ParseIntPipe) id: number,
    @Param("photoType") photoType: PhotoType
  ){
    return await this.photoService.remove(id, photoType)
  }

}
