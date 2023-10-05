import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PracticeService } from './practice.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { ID_PARAM } from 'src/common/constants/app.constants';
import { PracticeBadRequestErrorResponse } from './dto/practice-bad-request-error.dto';
import { PracticeNotFoundErrorResponse } from './dto/practice-not-found-error.dto';
import { CreatePracticeInterceptor } from './interceptors/create-practice.interceptor';
import { DeletePracticeInterceptor } from './interceptors/delete-practice.interceptor';
import { UpdatePracticeInterceptor } from './interceptors/update-practice.interceptor';
import { PracticeInterceptor } from './interceptors/practice.interceptor';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';
import { PracticeOkResponse } from './dto/ok-response/ok.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RolesDecorator } from '../roles/roles.decorator';
import { Role } from '@prisma/client';
import { CreatedPracticeOkResponse } from './dto/ok-response/created.dto';
import { GetPracticeOkResponse } from './dto/ok-response/get-practice.dto';
import { GetPracticesOkResponse } from './dto/ok-response/get-practices.dto';
import { UpdatedPracticeOkResponse } from './dto/ok-response/updated.dto';
import { DeletedPracticeOkResponse } from './dto/ok-response/deleted.dto';
import { GetPracticeInterceptor } from './interceptors/get-practice.interceptor';
import { GetPracticeFullOkResponse } from './dto/ok-response/get-practice-full.dto';

@Controller('practice')
@ApiTags('practice')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: PracticeBadRequestErrorResponse })
@ApiNotFoundResponse({ type: PracticeNotFoundErrorResponse })
@UseInterceptors(BaseInterceptor)
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post()
  @ApiOkResponse({ type: CreatedPracticeOkResponse })
  @RolesDecorator(Role.ADMIN)
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @UseInterceptors(CreatePracticeInterceptor)
  async create(@Body() data: CreatePracticeDto) {
    return await this.practiceService.create(data);
  }

  @Get()
  @ApiOkResponse({ type: GetPracticeOkResponse })
  @UseInterceptors(GetPracticeInterceptor)
  async getPractices(@Query() { offset, limit }: QueryPaginationParam) {
    return await this.practiceService.getPractices(offset, limit);
  }

  @Get(ID_PARAM)
  @ApiOkResponse({ type: GetPracticesOkResponse })
  @UseInterceptors(GetPracticeInterceptor)
  async getPractice(@Param('id', ParseIntPipe) id: number) {
    return await this.practiceService.getPractice(id);
  }

  @Get(`${ID_PARAM}/full`)
  @ApiOkResponse({ type: GetPracticeFullOkResponse })
  @UseInterceptors(GetPracticeInterceptor)
  async getPracticeFull(@Param('id', ParseIntPipe) id: number) {
    return await this.practiceService.getPracticeFull(id);
  }

  @Patch(ID_PARAM)
  @RolesDecorator(Role.ADMIN)
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: UpdatedPracticeOkResponse })
  @UseInterceptors(UpdatePracticeInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePracticeDto,
  ) {
    const ans = await this.practiceService.update(id, data);
    return ans 
  }

  @Delete(ID_PARAM)
  @RolesDecorator(Role.ADMIN)
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: DeletedPracticeOkResponse })
  @UseInterceptors(DeletePracticeInterceptor)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.practiceService.delete(id);
  }

  @Delete()
  @RolesDecorator(Role.ADMIN)
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: PracticeOkResponse })
  @UseInterceptors(DeletePracticeInterceptor)
  async deleteMany() {
    return await this.practiceService.deleteMany();
  }
}
