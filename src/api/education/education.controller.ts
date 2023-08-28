import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UseGuards } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from 'src/api/jwt-helper/types/jwt-helper.types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEducationInfoDto } from './dto/create-education-info.dto';
import { ID_PARAM, TRANSLATION_ROUTE } from 'src/common/constants/app.constants';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';

@ApiTags("education")
@ApiBearerAuth()
@UseInterceptors(BaseInterceptor)
@UseGuards(AccessJwtAuthGuard)
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) { }

  @Post()
  create(
    @UserParam() jwtData: jwtType,
    @Body() createEducationDto: CreateEducationDto
  ) {
    return this.educationService.create(jwtData.id, createEducationDto);
  }

  @Patch(ID_PARAM)
  update(
    @UserParam() jwtData: jwtType,
    @Param('id') id: number,
    @Body() createEducationDto: UpdateEducationDto
  ) {
    return this.educationService.update(jwtData.id, id, createEducationDto);
  }

  @Post(TRANSLATION_ROUTE)
  createInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() createEducationDto: CreateEducationInfoDto
  ) {
    return this.educationService.createInfo(id, langCode, createEducationDto);
  }

  @Patch(TRANSLATION_ROUTE)
  updateInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() createEducationInfoDto: CreateEducationInfoDto
  ) {
    return this.educationService.updateInfo(id, langCode, createEducationInfoDto);
  }

  @Delete(ID_PARAM)
  async delete(
    @UserParam() jwtData: jwtType,
    @Param('id', ParseIntPipe) educationId: number
  ) {
    return await this.educationService.remove(jwtData.id, educationId)
  }
}
