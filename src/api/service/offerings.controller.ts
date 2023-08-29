import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { OfferingsService } from './offerings.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { CreateOfferDto } from './dto/create-offer.dto';
import { ID_PARAM } from 'src/common/constants/app.constants';

import { UpdateOfferDto } from './dto/update-offer.dto';


@Controller('service')
@ApiTags("service")
@ApiBearerAuth()
@UseGuards(AccessJwtAuthGuard)
@UseInterceptors(BaseInterceptor)
export class OfferingsController {
  constructor(private readonly offeringsService: OfferingsService) {}

  @Post()
  async create(
    @Body() data: CreateOfferDto
  ){
    return await this.offeringsService.create(data)
  }

  @Get()
  async getOfferings() {
    return await this.offeringsService.getOfferings()
  }

  @Get(ID_PARAM)
  async getPractice(
    @Param('id', ParseIntPipe) id: number 
  ) {
    return await this.offeringsService.getOffer(id)
  }

  @Patch(ID_PARAM)
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() data: UpdateOfferDto
  ) {
    return await this.offeringsService.update(id, data)
  }

  @Delete(ID_PARAM)
  async delete(
    @Param('id', ParseIntPipe) id: number, 
  ){
    return await this.offeringsService.delete(id)
  }
}
