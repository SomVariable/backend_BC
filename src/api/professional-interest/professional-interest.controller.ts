import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfessionalInterestService } from './professional-interest.service';
import { CreateProfessionalInterestDto } from './dto/create-professional-interest.dto';
import { UpdateProfessionalInterestDto } from './dto/update-professional-interest.dto';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from 'src/api/jwt-helper/types/jwt-helper.types';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';
import { PIAccessToDataGuard } from './guards/access-to-data.guard';
import {  
  TRANSLATION_ROUTE_WITH_ID,
} from 'src/common/constants/app.constants';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { ProfessionalInterestInterceptor } from './interceptors/professional-interest.interceptor';
import { PInterestOkResponse } from './dto/ok-response/ok.dto';
import { PInterestBadRequestErrorResponse } from './dto/professional-interest-bad-request-error.dto';
import { PInterestNotFoundErrorResponse } from './dto/professional-interest-not-found-error.dto';
import { PInterestInfoOkResponse } from './dto/ok-response/ok-info.dto';

@ApiTags('professional-interests')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: PInterestBadRequestErrorResponse })
@ApiNotFoundResponse({ type: PInterestNotFoundErrorResponse })
@UseInterceptors(BaseInterceptor, ProfessionalInterestInterceptor)
@UseGuards(AccessJwtAuthGuard)
@Controller('professional-interest')
export class ProfessionalInterestController {
  constructor(
    private readonly professionalInterestService: ProfessionalInterestService,
  ) {}

  @Post()
  @ApiOkResponse({ type: PInterestOkResponse })
  async create(@UserParam() jwtData: jwtType) {
    return await this.professionalInterestService.create(jwtData.id);
  }

  @Post(TRANSLATION_ROUTE_WITH_ID)
  @ApiOkResponse({ type: PInterestInfoOkResponse })
  @UseGuards(PIAccessToDataGuard)
  async createInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() createProfessionalInterestDto: CreateProfessionalInterestDto,
  ) {
    return await this.professionalInterestService.createInfo(
      id,
      langCode,
      createProfessionalInterestDto,
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: PInterestOkResponse })
  @UseGuards(PIAccessToDataGuard)
  async getInterest(@Param('id') id: number) {
    return await this.professionalInterestService.findOne(id);
  }

  @Get()
  @ApiOkResponse({ type: PInterestOkResponse })
  async getInterests(@UserParam() jwtData: jwtType) {
    return await this.professionalInterestService.findOne(jwtData.id);
  }

  @Patch(TRANSLATION_ROUTE_WITH_ID)
  @ApiOkResponse({ type: PInterestInfoOkResponse })
  @UseGuards(PIAccessToDataGuard)
  async updateInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() data: UpdateProfessionalInterestDto,
  ) {
    return await this.professionalInterestService.updateInfo(
      id,
      langCode,
      data,
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: PInterestOkResponse })
  @UseGuards(PIAccessToDataGuard)
  async deleteInterest(@Param('id', ParseIntPipe) id: number) {
    return await this.professionalInterestService.remove(id);
  }
}
