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

@Controller('practice')
@ApiTags('practice')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: PracticeBadRequestErrorResponse })
@ApiNotFoundResponse({ type: PracticeNotFoundErrorResponse })
@UseGuards(AccessJwtAuthGuard)
@UseInterceptors(BaseInterceptor)
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post()
  @ApiOkResponse({ type: CreatePracticeInterceptor })
  @UseInterceptors(CreatePracticeInterceptor)
  async create(@Body() data: CreatePracticeDto) {
    return await this.practiceService.create(data);
  }

  @Get()
  @UseInterceptors(PracticeInterceptor)
  async getPractices(@Query() { offset, limit }: QueryPaginationParam) {
    return await this.practiceService.getPractices(offset, limit);
  }

  @Get(ID_PARAM)
  @UseInterceptors(PracticeInterceptor)
  async getPractice(@Param('id', ParseIntPipe) id: number) {
    return await this.practiceService.getPractice(id);
  }

  @Patch(ID_PARAM)
  @ApiOkResponse({ type: UpdatePracticeInterceptor })
  @UseInterceptors(UpdatePracticeInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePracticeDto,
  ) {
    return await this.practiceService.update(id, data);
  }

  @Delete(ID_PARAM)
  @ApiOkResponse({ type: DeletePracticeInterceptor })
  @UseInterceptors(DeletePracticeInterceptor)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.practiceService.delete(id);
  }
}
