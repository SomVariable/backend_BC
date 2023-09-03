import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { OfferingsService } from './offerings.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { CreateOfferDto } from './dto/create-offer.dto';
import { ID_PARAM } from 'src/common/constants/app.constants';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OfferBadRequestErrorResponse } from './dto/offer-bad-request-error.dto';
import { OfferNotFoundErrorResponse } from './dto/offer-not-found-error.dto';
import { CreatedOkResponse } from './dto/ok-response/created.dto';
import { UpdatedOkResponse } from './dto/ok-response/updated.dto';
import { DeletedOkResponse } from './dto/ok-response/deleted.dto';
import { GetOfferingsOkResponse } from './dto/ok-response/get-areas.dto';
import { GetOfferOkResponse } from './dto/ok-response/get-area.dto';
import { CreateOfferInterceptor } from './interceptors/create-area.interceptor';
import { GetOfferInterceptor } from './interceptors/get-area.interceptor';
import { UpdateOfferInterceptor } from './interceptors/update-area.interceptor';
import { DeleteOfferInterceptor } from './interceptors/delete-area.interceptor';


@Controller('service')
@ApiTags("service")
@ApiBearerAuth()
@ApiBadRequestResponse({ type: OfferBadRequestErrorResponse })
@ApiNotFoundResponse({ type: OfferNotFoundErrorResponse })
@UseInterceptors(BaseInterceptor)
@UseGuards(AccessJwtAuthGuard)
export class OfferingsController {
  constructor(private readonly offeringsService: OfferingsService) { }

  @Post()
  @ApiOkResponse({ type: CreatedOkResponse})
  @UseInterceptors(CreateOfferInterceptor)
  async create(
    @Body() data: CreateOfferDto
  ) {
    return await this.offeringsService.create(data)
  }

  @Get()
  @ApiOkResponse({ type: GetOfferingsOkResponse})
  @UseInterceptors(GetOfferInterceptor)
  async getOfferings() {
    return await this.offeringsService.getOfferings()
  }

  @Get(ID_PARAM)
  @ApiOkResponse({ type: GetOfferOkResponse})
  @UseInterceptors(GetOfferInterceptor)
  async getOffer(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.offeringsService.getOffer(id)
  }

  @Patch(ID_PARAM)
  @ApiOkResponse({ type: UpdatedOkResponse})
  @UseInterceptors(UpdateOfferInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateOfferDto
  ) {
    return await this.offeringsService.update(id, data)
  }

  @Delete(ID_PARAM)
  @ApiOkResponse({ type: DeletedOkResponse})
  @UseInterceptors(DeleteOfferInterceptor)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.offeringsService.delete(id)
  }
}
