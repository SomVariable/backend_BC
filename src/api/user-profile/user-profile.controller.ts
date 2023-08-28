import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from '../jwt-helper/types/jwt-helper.types';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { TRANSLATION_ROUTE } from 'src/common/constants/app.constants';

@Controller('user-profile')
@ApiTags("user-profile")
@ApiBearerAuth()
@UseInterceptors(BaseInterceptor)
@UseGuards(AccessJwtAuthGuard, RolesGuard)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) { }

  @Post()
  async createProfile(
    @UserParam() jwt_data: jwtType,
    @Body() data: CreateUserProfileDto
  ){
    console.log(jwt_data)
    return await this.userProfileService.create(jwt_data.id, data) 
  }

  @Get()
  async findAll(
    @UserParam() { id }: jwtType) {
    return await this.userProfileService.findAll(id);
  }

  @Get(TRANSLATION_ROUTE)
  async findOne(
    @Param('langCode') langCode: string,
    @UserParam() { id }: jwtType) {
    return await this.userProfileService.findOne(id, langCode);
  }

  @Patch(TRANSLATION_ROUTE)
  async updateByLang(
    @Param('langCode') langCode: string,
    @UserParam() { id }: jwtType, 
    @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return await this.userProfileService.update(id, updateUserProfileDto, langCode);
  }
}
