import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from 'src/api/jwt-helper/types/jwt-helper.types';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEducationInfoDto } from './dto/create-education-info.dto';
import {
  ID_PARAM,
  TRANSLATION_ROUTE_WITH_ID,
} from 'src/common/constants/app.constants';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { EducationInterceptor } from './interceptors/education.interceptor';
import { EducationOkResponse } from './dto/ok-response/ok.dto';
import { EducationNotFoundErrorResponse } from './dto/education-not-found-error.dto';
import { EducationBadRequestErrorResponse } from './dto/education-bad-request-error.dto';
import { EducationAccessToDataGuard } from './guards/education_access.guard';
import { CreatedOkResponse } from './dto/ok-response/created.dto';
import { UpdatedOkResponse } from './dto/ok-response/updated.dto';
import { DeletedOkResponse } from './dto/ok-response/deleted.dto';
import { EducationCreateInterceptor } from './interceptors/education-create.interceptor';
import { EducationCreateInfoInterceptor } from './interceptors/education-create-info.interceptor';
import { EducationUpdateInterceptor } from './interceptors/education-update.interceptor';
import { EducationUpdateInfoInterceptor } from './interceptors/education-update-info.interceptor';
import { EducationDeleteInterceptor } from './interceptors/education-delete.interceptor';
import { UpdateEducationInfoDto } from './dto/update-education-info.dto';
import { EducationGetInterceptor } from './interceptors/education-get.interceptor';
import { EducationExistenceGuard } from './guards/data_existence_check.guard';

@ApiTags('education')
@ApiBearerAuth()
@ApiOkResponse({ type: EducationOkResponse })
@ApiNotFoundResponse({ type: EducationNotFoundErrorResponse })
@ApiBadRequestResponse({ type: EducationBadRequestErrorResponse })
@UseInterceptors(BaseInterceptor, EducationInterceptor)
@UseGuards(AccessJwtAuthGuard)
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  @ApiOkResponse({ type: CreatedOkResponse })
  @UseInterceptors(EducationCreateInterceptor)
  async create(
    @UserParam() jwtData: jwtType,
    @Body() createEducationDto: CreateEducationDto,
  ) {
    return await this.educationService.create(jwtData.id, createEducationDto);
  }

  @Get(ID_PARAM)
  @UseGuards(EducationExistenceGuard, EducationAccessToDataGuard)
  @UseInterceptors(EducationGetInterceptor)
  async getEducation(@Param('id', ParseIntPipe) id: number) {
    return await this.educationService.findOne(id);
  }

  @Patch(ID_PARAM)
  @ApiOkResponse({ type: UpdatedOkResponse })
  @UseGuards(EducationExistenceGuard, EducationAccessToDataGuard)
  @UseInterceptors(EducationUpdateInterceptor)
  async update(
    @Param('id') id: number,
    @Body() createEducationDto: UpdateEducationDto,
  ) {
    return await this.educationService.update(id, createEducationDto);
  }

  @Delete(ID_PARAM)
  @ApiOkResponse({ type: DeletedOkResponse })
  @UseGuards(EducationExistenceGuard, EducationAccessToDataGuard)
  @UseInterceptors(EducationDeleteInterceptor)
  async delete(@Param('id', ParseIntPipe) educationId: number) {
    return await this.educationService.remove(educationId);
  }

  @Post(TRANSLATION_ROUTE_WITH_ID)
  @ApiOkResponse({ type: UpdatedOkResponse })
  @UseInterceptors(EducationCreateInfoInterceptor)
  @UseGuards(EducationExistenceGuard, EducationAccessToDataGuard)
  async createInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() createEducationDto: CreateEducationInfoDto,
  ) {
    return await this.educationService.createInfo(
      id,
      langCode,
      createEducationDto,
    );
  }

  @Patch(TRANSLATION_ROUTE_WITH_ID)
  @UseGuards(EducationExistenceGuard, EducationAccessToDataGuard)
  @UseInterceptors(EducationUpdateInfoInterceptor)
  async updateInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() updateEducationInfoDto: UpdateEducationInfoDto,
  ) {
    return await this.educationService.updateInfo(
      id,
      langCode,
      updateEducationInfoDto,
    );
  }
}
