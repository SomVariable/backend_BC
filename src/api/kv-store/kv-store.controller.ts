import { 
  Controller, 
  Post, 
  Patch, 
  Delete, 
  Get, 
  Param,
  Body, 
  UseInterceptors,
  UseGuards,
  ParseIntPipe} from '@nestjs/common';
import { KvStoreService } from './kv-store.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SaveSessionDto } from './dto/save-session.dto';
import { SetVerificationProps } from './kv-types/kv-store.type';
import { UpdateVerifyDto } from './dto/update-verify-session.dto';
import { DeviceType } from 'src/common/decorators/device-type.decorator';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { KVStoreInterceptor } from './interceptors/kv-store.interceptor';
import { KVStoreOkResponse } from './dto/ok-response/ok.dto';
import { KVStoreBadRequestErrorResponse } from './dto/kv-store-bad-request-error.dto';
import { KVStoreNotFoundErrorResponse } from './dto/kv-store-not-found-error.dto';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from '../jwt-helper/types/jwt-helper.types';
import { ID_PARAM } from 'src/common/constants/app.constants';

@ApiTags("kv-store")
@ApiOkResponse({ type: KVStoreOkResponse})
@ApiBadRequestResponse({ type: KVStoreBadRequestErrorResponse})
@ApiNotFoundResponse({ type: KVStoreNotFoundErrorResponse})
@UseInterceptors(BaseInterceptor, KVStoreInterceptor)
@Controller('kv-store')
export class KvStoreController {
  constructor(private readonly kvStoreService: KvStoreService) {}
  
  @Post('session')
  @ApiBearerAuth()
  async createSession(
    @UserParam() {id}: jwtType,
    @DeviceType() deviceType: string){
    const session = await this.kvStoreService.generateSessionKey(id, deviceType)
    return await this.kvStoreService.createSession({id: session})
  }
  
  @Get('session/')
  async getSession(
    @UserParam() {id}: jwtType,
    @DeviceType() deviceType: string){
    const session = await this.kvStoreService.generateSessionKey(id, deviceType)
    return await this.kvStoreService.getSession(session)
  }

  @Patch('session/verification')
  @ApiBearerAuth()
  async setVerificationProps(
    @UserParam() {id}: jwtType,
    @DeviceType() deviceType: string,
    @Body() data: UpdateVerifyDto){
    const session = await this.kvStoreService.generateSessionKey(id, deviceType)
    return await this.kvStoreService.setVerificationProps(session, data)
  }
  
  @Patch('session/block')
  @ApiBearerAuth()
  async blockSession(
    @UserParam() {id}: jwtType,
    @DeviceType() deviceType: string){
    const session = await this.kvStoreService.generateSessionKey(id, deviceType)

    return await this.kvStoreService.blockSession(session)
  }

  @Patch(`session/active/${ID_PARAM}`)
  async activeSession(
    @Param('id', ParseIntPipe) id: number,
    @DeviceType() deviceType: string){
    const session = await this.kvStoreService.generateSessionKey(id, deviceType)

    return await this.kvStoreService.activeSession(session)
  }

  @Delete('session')
  @ApiBearerAuth()
  async deleteSession(
    @UserParam() {id}: jwtType,
    @DeviceType() deviceType: string){
    const session = await this.kvStoreService.generateSessionKey(id, deviceType)

    return await this.kvStoreService.deleteSession(session)
  }

}
