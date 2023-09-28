import {
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  Param,
  Body,
  UseInterceptors,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { KvStoreService } from './kv-store.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateVerifyDto } from './dto/update-verify-session.dto';
import { DeviceType } from '../../common/decorators/device-type.decorator';
import { BaseInterceptor } from '../../common/interceptors/data-to-json';
import { KVStoreInterceptor } from './interceptors/kv-store.interceptor';
import { KVStoreOkResponse } from './dto/ok-response/ok.dto';
import { KVStoreBadRequestErrorResponse } from './dto/kv-store-bad-request-error.dto';
import { KVStoreNotFoundErrorResponse } from './dto/kv-store-not-found-error.dto';
import { ID_PARAM } from '../../common/constants/app.constants';
import { UpdateSessionDto } from './dto/update-session.dto';

@ApiTags('kv-store')
@ApiOkResponse({ type: KVStoreOkResponse })
@ApiBadRequestResponse({ type: KVStoreBadRequestErrorResponse })
@ApiNotFoundResponse({ type: KVStoreNotFoundErrorResponse })
@UseInterceptors(BaseInterceptor, KVStoreInterceptor)
@Controller('kv-store')
export class KvStoreController {
  constructor(private readonly kvStoreService: KvStoreService) {}

  @Post(`session/${ID_PARAM}`)
  @ApiBearerAuth()
  async createSession(
    @Param('id', ParseIntPipe) id: number,
    @DeviceType() deviceType: string,
  ) {
    const session = await this.kvStoreService.generateSessionKey(
      id,
      deviceType,
    );
    return await this.kvStoreService.createSession({ id: session });
  }

  @Get(`session/${ID_PARAM}`)
  async getSession(
    @Param('id', ParseIntPipe) id : number,
    @DeviceType() deviceType: string,
  ) {
    const session = await this.kvStoreService.generateSessionKey(
      id,
      deviceType,
    );
    return await this.kvStoreService.getSession(session);
  }

  @Patch(`session/${ID_PARAM}`)
  @ApiBearerAuth()
  async patchSession(
    @Param('id', ParseIntPipe) id: number,
    @DeviceType() deviceType: string,
    @Body() data: UpdateSessionDto,
  ) {
    const session = await this.kvStoreService.generateSessionKey(
      id,
      deviceType,
    );
    return await this.kvStoreService.updateSession(session, data);
  }

  @Delete(`session/${ID_PARAM}`)
  @ApiBearerAuth()
  async deleteSession(
    @Param('id', ParseIntPipe) id: number,
    @DeviceType() deviceType: string,
  ) {
    const session = await this.kvStoreService.generateSessionKey(
      id,
      deviceType,
    );

    return await this.kvStoreService.deleteSession(session);
  }

  @Patch(`session/${ID_PARAM}/verification`)
  @ApiBearerAuth()
  async setVerificationProps(
    @Param('id', ParseIntPipe) id: number,
    @DeviceType() deviceType: string,
    @Body() data: UpdateVerifyDto,
  ) {
    const session = await this.kvStoreService.generateSessionKey(
      id,
      deviceType,
    );
    return await this.kvStoreService.setVerificationProps(session, data);
  }

  @Patch(`session/${ID_PARAM}/active`)
  async activeSession(
    @Param('id', ParseIntPipe) id: number,
    @DeviceType() deviceType: string,
  ) {
    const session = await this.kvStoreService.generateSessionKey(
      id,
      deviceType,
    );

    return await this.kvStoreService.activeSession(session);
  }

  @Patch(`session/${ID_PARAM}/block`)
  @ApiBearerAuth()
  async blockSession(
    @Param('id', ParseIntPipe) id: number,
    @DeviceType() deviceType: string,
  ) {
    const session = await this.kvStoreService.generateSessionKey(
      id,
      deviceType,
    );

    return await this.kvStoreService.blockSession(session);
  }

}
