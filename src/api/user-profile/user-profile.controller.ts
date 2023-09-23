import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from '../jwt-helper/types/jwt-helper.types';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { TRANSLATION_ROUTE } from 'src/common/constants/app.constants';
import { LangCodeDto } from 'src/common/dto/translation-param.dto';
import { UserProfileInterceptor } from './interceptors/user-profile.interceptor';
import { UserBadRequestErrorResponse } from './dto/user-profile-bad-request-error.dto';
import { UserNotFoundErrorResponse } from './dto/user-profile-not-found-error.dto';
import { UserOkResponse } from './dto/ok-response/ok.dto';
import { API_FILE_CONFIG } from '../photo/constants/photo.constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoService } from '../photo/photo.service';
import { validateFile } from '../photo/helpers/fileValidation.helper';
import { PhotoType } from '@prisma/client';

@Controller('user-profile')
@ApiTags('user-profile')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: UserBadRequestErrorResponse })
@ApiNotFoundResponse({ type: UserNotFoundErrorResponse })
@ApiOkResponse({ type: UserOkResponse })
@UseInterceptors(BaseInterceptor, UserProfileInterceptor)
@UseGuards(AccessJwtAuthGuard, RolesGuard)
export class UserProfileController {
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly photoService: PhotoService,
  ) {}

  @Post()
  async createProfile(
    @UserParam() jwt_data: jwtType,
    @Body() data: CreateUserProfileDto,
  ) {
    return await this.userProfileService.create(jwt_data.id, data);
  }

  @Post(`avatar`)
  @ApiConsumes('multipart/form-data')
  @ApiBody(API_FILE_CONFIG)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile(new ParseFilePipe(validateFile)) file: Express.Multer.File,
    @UserParam() { id }: jwtType,
  ) {
    return this.photoService.create(file, {
      type: 'AVATAR',
      userId: id,
      itemId: id,
    });
  }

  @Get('avatar')
  async getAvatar(@UserParam() { id }: jwtType) {
    return await this.photoService.findOne(id, PhotoType.AVATAR);
  }

  @Get()
  async findAll(@UserParam() { id }: jwtType) {
    return await this.userProfileService.findAll(id);
  }

  @Get(TRANSLATION_ROUTE)
  async findOne(
    @Param() { langCode }: LangCodeDto,
    @UserParam() { id }: jwtType,
  ) {
    return await this.userProfileService.findOne(id, langCode);
  }

  @Patch(TRANSLATION_ROUTE)
  async updateByLang(
    @Param() { langCode }: LangCodeDto,
    @UserParam() { id }: jwtType,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return await this.userProfileService.update(
      id,
      updateUserProfileDto,
      langCode,
    );
  }
}
