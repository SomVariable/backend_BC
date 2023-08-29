import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { ID_PARAM, TRANSLATION_ROUTE_WITH_ID } from 'src/common/constants/app.constants';
import { TranslationParamDto } from 'src/common/dto/translation-param.dto';
import { CreateCategoryDto } from '../area/dto/create-category.dto';
import { CategoryDto } from '../category-translation/dto/category-pram.dto';
import { UpdateCategoryDto } from '../category-translation/dto/update-category.dto';

@Controller('practice')
@ApiTags("practice")
@ApiBearerAuth()
@UseGuards(AccessJwtAuthGuard)
@UseInterceptors(BaseInterceptor)
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post()
  async create(
    @Body() data: CreatePracticeDto
  ){
    return await this.practiceService.create(data)
  }

  @Get()
  async getPractices() {
    return await this.practiceService.getPractices()
  }

  @Get(ID_PARAM)
  async getPractice(
    @Param('id', ParseIntPipe) id: number 
  ) {
    return await this.practiceService.getPractice(id)
  }

  @Patch(ID_PARAM)
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() data: UpdatePracticeDto
  ) {
    return await this.practiceService.update(id, data)
  }

  @Delete(ID_PARAM)
  async delete(
    @Param('id', ParseIntPipe) id: number, 
  ){
    return await this.practiceService.delete(id)
  }
}
