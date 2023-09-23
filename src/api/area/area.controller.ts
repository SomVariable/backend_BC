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
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { ID_PARAM } from 'src/common/constants/app.constants';
import { CreateAreaInterceptor } from './interceptors/create-area.interceptor';
import { GetAreaInterceptor } from './interceptors/get-area.interceptor';
import { UpdateAreaInterceptor } from './interceptors/update-area.interceptor';
import { DeleteAreaInterceptor } from './interceptors/delete-area.interceptor';
import { DeletedOkResponse } from './dto/ok-response/deleted.dto';
import { UpdatedOkResponse } from './dto/ok-response/updated.dto';
import { CreatedOkResponse } from './dto/ok-response/created.dto';
import { GetAreaOkResponse } from './dto/ok-response/get-area.dto';
import { GetAreasOkResponse } from './dto/ok-response/get-areas.dto';
import { AreaNotFoundErrorResponse } from './dto/area-not-found-error.dto';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';

@Controller('area')
@ApiTags('area')
@ApiBearerAuth()
@ApiNotFoundResponse({ type: AreaNotFoundErrorResponse })
@UseGuards(AccessJwtAuthGuard)
@UseInterceptors(BaseInterceptor)
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  @ApiOkResponse({ type: CreatedOkResponse })
  @UseInterceptors(CreateAreaInterceptor)
  async createAreaDto(@Body() data: CreateAreaDto) {
    return await this.areaService.create(data);
  }

  @Get()
  @ApiOkResponse({ type: GetAreasOkResponse })
  @UseInterceptors(GetAreaInterceptor)
  async getAreas(@Query() { limit, offset }: QueryPaginationParam) {
    return await this.areaService.getAreas(limit, offset);
  }

  @Get(ID_PARAM)
  @ApiOkResponse({ type: GetAreaOkResponse })
  @UseInterceptors(GetAreaInterceptor)
  async getArea(@Param('id', ParseIntPipe) id: number) {
    return await this.areaService.getArea(id);
  }

  @Patch(ID_PARAM)
  @ApiOkResponse({ type: UpdatedOkResponse })
  @UseInterceptors(UpdateAreaInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAreaDto,
  ) {
    return await this.areaService.update(id, data);
  }

  @Delete(ID_PARAM)
  @ApiOkResponse({ type: DeletedOkResponse })
  @UseInterceptors(DeleteAreaInterceptor)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.areaService.delete(id);
  }
}
