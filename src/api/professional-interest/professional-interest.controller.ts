import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfessionalInterestService } from './professional-interest.service';
import { CreateProfessionalInterestDto } from './dto/create-professional-interest.dto';
import { UpdateProfessionalInterestDto } from './dto/update-professional-interest.dto';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from 'src/api/jwt-helper/types/jwt-helper.types';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';
import { PIAccessToDataGuard } from './guards/access-to-data.guard';
import { ID_PARAM, TRANSLATION_ROUTE_WITH_ID} from 'src/common/constants/app.constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';

@ApiTags("professional-interests")
@ApiBearerAuth()
@UseInterceptors(BaseInterceptor)
@UseGuards(AccessJwtAuthGuard)
@Controller('professional-interest')
export class ProfessionalInterestController {
  constructor(private readonly professionalInterestService: ProfessionalInterestService) {}

  @Post()
  async create(
    @UserParam() jwtData: jwtType
    ) {
    return await this.professionalInterestService.create(jwtData.id);
  }

  @Post(TRANSLATION_ROUTE_WITH_ID)
  async createInfo(
    @Param() {id, langCode}: TranslationParamDto,
    @Body() createProfessionalInterestDto: CreateProfessionalInterestDto
    ) {
    return await this.professionalInterestService.createInfo(id, langCode, createProfessionalInterestDto);
  }

  @UseGuards(PIAccessToDataGuard)
  @Get(ID_PARAM)
  async getInterest(
    @Param('id') id: number,
  ){
    return await this.professionalInterestService.findOne(id)
  }

  @Get()
  async getInterests(
    @UserParam() jwtData: jwtType
  ){
    return await this.professionalInterestService.findOne(jwtData.id)
  }

  @UseGuards(PIAccessToDataGuard)
  @Patch(TRANSLATION_ROUTE_WITH_ID)
  async updateInfo(
    @Param() {id, langCode}: TranslationParamDto,
    @Body() data: UpdateProfessionalInterestDto
  ){
    return await this.professionalInterestService.updateInfo(id, langCode, data)
  }
  
  @UseGuards(PIAccessToDataGuard)
  @Delete(ID_PARAM)
  async deleteInterest(
    @Param('id', ParseIntPipe) id: number
  ){
    return await this.professionalInterestService.remove(id)
  }
}
