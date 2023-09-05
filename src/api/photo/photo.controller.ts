import { Controller, Post, Get, Delete, UploadedFile, UseInterceptors, Body, Param, UseGuards } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { API_FILE_CONFIG, PHOTO_TYPE_PATH } from './constants/photo.constants';
import { CreatePhotoBodyDto } from './dto/create-photo.dto';
import { ID_PARAM } from 'src/common/constants/app.constants';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';

@Controller('photo')
@ApiTags("photo")
@ApiBearerAuth()
@UseGuards(AccessJwtAuthGuard)
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody(API_FILE_CONFIG)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePhotoBodyDto
  ){
    return await this.photoService.create(file, body)
  }

  @Get(ID_PARAM)
  async getFileInfo(
    @Param("id") id: number
  ){
    return await this.photoService.findOne(id)
  }
  
  @Delete(`${ID_PARAM}/${PHOTO_TYPE_PATH}`)
  async deleteFileInfo(
    @Param() {photoType, id}: any
  ){
    return await this.photoService.remove(parseInt(id), photoType)

  }

}
