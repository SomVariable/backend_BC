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
  TRANSLATION_ROUTE,
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
    return this.educationService.create(jwtData.id, createEducationDto);
  }

  @Get(ID_PARAM)
  @UseGuards(EducationAccessToDataGuard)
  async getEducation(@Param('id', ParseIntPipe) id: number) {
    return await this.educationService.findOne(id);
  }

  @Patch(ID_PARAM)
  @ApiOkResponse({ type: UpdatedOkResponse })
  @UseGuards(EducationAccessToDataGuard)
  @UseInterceptors(EducationUpdateInterceptor)
  update(
    @Param('id') id: number,
    @Body() createEducationDto: UpdateEducationDto,
  ) {
    return this.educationService.update(id, createEducationDto);
  }

  @Delete(ID_PARAM)
  @ApiOkResponse({ type: DeletedOkResponse })
  @UseGuards(EducationAccessToDataGuard)
  @UseInterceptors(EducationDeleteInterceptor)
  async delete(@Param('id', ParseIntPipe) educationId: number) {
    return await this.educationService.remove(educationId);
  }

  @Post(TRANSLATION_ROUTE)
  @ApiOkResponse({ type: UpdatedOkResponse })
  @UseInterceptors(EducationCreateInfoInterceptor)
  @UseGuards(EducationAccessToDataGuard)
  createInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() createEducationDto: CreateEducationInfoDto,
  ) {
    return this.educationService.createInfo(id, langCode, createEducationDto);
  }

  @Patch(TRANSLATION_ROUTE)
  @UseGuards(EducationAccessToDataGuard)
  @UseInterceptors(EducationUpdateInfoInterceptor)
  updateInfo(
    @Param() { id, langCode }: TranslationParamDto,
    @Body() createEducationInfoDto: CreateEducationInfoDto,
  ) {
    return this.educationService.updateInfo(
      id,
      langCode,
      createEducationInfoDto,
    );
  }
}
