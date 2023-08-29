import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { ID_PARAM, TRANSLATION_ROUTE_WITH_ID } from 'src/common/constants/app.constants';

@Controller('area')
@ApiTags("area")
@ApiBearerAuth()
@UseGuards(AccessJwtAuthGuard)
@UseInterceptors(BaseInterceptor)
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  async createAreaDto(
    @Body() data: CreateAreaDto
  ){
    return await this.areaService.create(data)
  }

  @Get()
  async getAreas() {
    return await this.areaService.getAreas()
  }

  @Get(ID_PARAM)
  async getArea(
    @Param('id', ParseIntPipe) id: number 
  ) {
    return await this.areaService.getArea(id)
  }

  @Patch(ID_PARAM)
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() data: UpdateAreaDto
  ) {
    return await this.areaService.update(id, data)
  }

  @Delete(ID_PARAM)
  async delete(
    @Param('id', ParseIntPipe) id: number, 
  ){
    return await this.areaService.delete(id)
  }
}
