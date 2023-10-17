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
} from '@nestjs/common';
import { OfferingsService } from './offerings.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { CreateOfferDto } from './dto/create-offer.dto';
import { ID_PARAM } from 'src/common/constants/app.constants';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OfferBadRequestErrorResponse } from './dto/offer-bad-request-error.dto';
import { OfferNotFoundErrorResponse } from './dto/offer-not-found-error.dto';
import { CreatedOfferOkResponse } from './dto/ok-response/created.dto';
import { UpdatedOfferOkResponse } from './dto/ok-response/updated.dto';
import { DeletedOfferOkResponse } from './dto/ok-response/deleted.dto';
import { GetOfferingsOkResponse } from './dto/ok-response/get-offerings.dto';
import { GetOfferOkResponse } from './dto/ok-response/get-offer.dto';
import { CreateOfferInterceptor } from './interceptors/create-area.interceptor';
import { GetOfferInterceptor } from './interceptors/get-area.interceptor';
import { UpdateOfferInterceptor } from './interceptors/update-area.interceptor';
import { DeleteOfferInterceptor } from './interceptors/delete-area.interceptor';
import { RolesDecorator } from '../roles/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('service')
@ApiTags('service')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: OfferBadRequestErrorResponse })
@ApiNotFoundResponse({ type: OfferNotFoundErrorResponse })
@UseInterceptors(BaseInterceptor)
export class OfferingsController {
  constructor(private readonly offeringsService: OfferingsService) {}

  @Post()
  @RolesDecorator(Role.ADMIN)
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: CreatedOfferOkResponse })
  @UseInterceptors(CreateOfferInterceptor)
  async create(@Body() data: CreateOfferDto) {
    return await this.offeringsService.create(data);
  }

  @Get()
  @ApiOkResponse({ type: GetOfferingsOkResponse })
  @UseInterceptors(GetOfferInterceptor)
  async getOfferings() {
    return await this.offeringsService.getOfferings();
  }

  @Get(ID_PARAM)
  @ApiOkResponse({ type: GetOfferOkResponse })
  @UseInterceptors(GetOfferInterceptor)
  async getOffer(@Param('id', ParseIntPipe) id: number) {
    return await this.offeringsService.getOffer(id);
  }

  @Patch(ID_PARAM)
  @RolesDecorator(Role.ADMIN)
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: UpdatedOfferOkResponse })
  @UseInterceptors(UpdateOfferInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateOfferDto,
  ) {
    return await this.offeringsService.update(id, data);
  }

  @Delete()
  @RolesDecorator(Role.ADMIN)
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: DeletedOfferOkResponse })
  @UseInterceptors(DeleteOfferInterceptor)
  async deleteMany() {
    return await this.offeringsService.deleteMany();
  }

  @Delete(ID_PARAM)
  @RolesDecorator(Role.ADMIN)
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: DeletedOfferOkResponse })
  @UseInterceptors(DeleteOfferInterceptor)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.offeringsService.delete(id);
  }
}
