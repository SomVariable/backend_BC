import { LangCodeDto, TranslationParamDto } from '../../common/dto/translation-param.dto';
import { Controller, Get, Post, Patch, Body, UseGuards, Param, Delete, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { AwardService } from './award.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from 'src/api/jwt-helper/types/jwt-helper.types';
import { AwardAccessToDataGuard } from './guards/access-to-data.guard';
import { ID_PARAM, TRANSLATION_ROUTE, TRANSLATION_ROUTE_WITH_ID} from 'src/common/constants/app.constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';

@ApiTags("awards")
@ApiBearerAuth()
@UseInterceptors(BaseInterceptor)
@UseGuards(AccessJwtAuthGuard)
@Controller('award')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @Post()
  async create(
    @UserParam() jwtData: jwtType
    ) {
    return await this.awardService.create(jwtData.id);
  }

  @Get() 
  async getAwards(
    @UserParam() jwtData: jwtType,
    @Param() {langCode}: LangCodeDto
  ) {
    return await this.awardService.getAwardsByLang(jwtData.id, langCode)
  }

  @UseGuards(AwardAccessToDataGuard)
  @Get(ID_PARAM)
  async getAward(
    @Param('id', ParseIntPipe) id: number
  ){
    return await this.awardService.getAward(id)
  }

  @UseGuards(AwardAccessToDataGuard)
  @Delete(ID_PARAM)
  async delete (
    @Param('id', ParseIntPipe) id: number  
  ) {
    return this.awardService.delete(id)
  }
  
  @UseGuards(AwardAccessToDataGuard)
  @Post(TRANSLATION_ROUTE_WITH_ID)
  async createInfo(
    @Param() {id, langCode}: TranslationParamDto,
    @Body() data: CreateAwardDto
  ){
    return await this.awardService.createInfo(id, langCode, data)
  }

  @Patch(TRANSLATION_ROUTE_WITH_ID)
  async UpdateInfo(
    @Param() {id, langCode}: TranslationParamDto,
    @Body() data: UpdateAwardDto
  ) {
    return await this.awardService.updateInfo(id, langCode, data)
  }
  
  @Get(TRANSLATION_ROUTE) 
  async getAwardsByLangCode(
    @UserParam() jwtData: jwtType,
    @Param() {langCode}: LangCodeDto
  ) {
    return await this.awardService.getAwardsByLang(jwtData.id, langCode)
  }
}
