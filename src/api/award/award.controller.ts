import { LangCodeDto, TranslationParamDto } from '../../common/dto/translation-param.dto';
import { Query, Controller, Get, Post, Patch, Body, UseGuards, Param, Delete, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { AwardService } from './award.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from 'src/api/jwt-helper/types/jwt-helper.types';
import { AwardAccessToDataGuard } from './guards/access-to-data.guard';
import { ID_PARAM, TRANSLATION_ROUTE, TRANSLATION_ROUTE_WITH_ID } from 'src/common/constants/app.constants';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { AwardBadRequestErrorResponse } from './dto/award-bad-request-error.dto';
import { AwardNotFoundErrorResponse } from './dto/award-not-found-error.dto';
import { GetAwardOkResponse } from './dto/ok-response/get-award.dto';
import { CreatedOkResponse } from './dto/ok-response/created.dto';
import { GetAwardsOkResponse } from './dto/ok-response/get-awards.dto';
import { DeletedOkResponse } from './dto/ok-response/deleted.dto';
import { CreatedInfoAwardOkResponse } from './dto/ok-response/info-created.dto';
import { UpdatedInfoAwardOkResponse } from './dto/ok-response/info-updated.dto';
import { CreateAwardInterceptor } from './interceptors/create.interceptor';
import { GetAwardInterceptor } from './interceptors/get-award.interceptor';
import { UpdateAwardInterceptor } from './interceptors/update.interceptor';
import { CreateAwardInfoInterceptor } from './interceptors/create-info.interceptor';
import { UpdateAwardInfoInterceptor } from './interceptors/update-info.interceptor';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';

@ApiTags("awards")
@ApiBearerAuth()
@ApiBadRequestResponse({ type: AwardBadRequestErrorResponse })
@ApiNotFoundResponse({ type: AwardNotFoundErrorResponse })
@UseInterceptors(BaseInterceptor)
@UseGuards(AccessJwtAuthGuard)
@Controller('award')
export class AwardController {
  constructor(private readonly awardService: AwardService) { }

  @Post()
  @ApiOkResponse({ type: CreatedOkResponse })
  @UseInterceptors(CreateAwardInterceptor)
  async create(
    @UserParam() jwtData: jwtType
  ) {
    return await this.awardService.create(jwtData.id);
  }

  @Get()
  @ApiOkResponse({ type: GetAwardsOkResponse })
  @UseInterceptors(GetAwardInterceptor)
  async getAwards(
    @Query() { limit, offset }: QueryPaginationParam,
    @UserParam() jwtData: jwtType,
    @Param() { langCode }: LangCodeDto
  ) {
    return await this.awardService.getAwardsByLang(
      jwtData.id,
      langCode,
      offset,
      limit
    )
  }

  @Get(ID_PARAM)
  @ApiOkResponse({ type: GetAwardOkResponse })
  @UseInterceptors(GetAwardInterceptor)
  @UseGuards(AwardAccessToDataGuard)
  async getAward(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.awardService.getAward(id)
  }

  @Delete(ID_PARAM)
  @ApiOkResponse({ type: DeletedOkResponse })
  @UseInterceptors(UpdateAwardInterceptor)
  @UseGuards(AwardAccessToDataGuard)
  async delete(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.awardService.delete(id)
  }

  @Post(TRANSLATION_ROUTE_WITH_ID)
  @ApiOkResponse({ type: CreatedInfoAwardOkResponse })
  @UseInterceptors(CreateAwardInfoInterceptor)
  @UseGuards(AwardAccessToDataGuard)
  async createInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() data: CreateAwardDto
  ) {
    return await this.awardService.createInfo(id, langCode, data)
  }

  @Patch(TRANSLATION_ROUTE_WITH_ID)
  @UseInterceptors(UpdateAwardInfoInterceptor)
  @ApiOkResponse({ type: UpdatedInfoAwardOkResponse })
  async UpdateInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() data: UpdateAwardDto
  ) {
    return await this.awardService.updateInfo(id, langCode, data)
  }
}
