import { 
  Controller, 
  Post, 
  Patch, 
  Delete, 
  Get, 
  Param,
  Body, 
  UseInterceptors,
  UseGuards} from '@nestjs/common';
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

@ApiTags("kv-store")
@ApiOkResponse({ type: KVStoreOkResponse})
@ApiBadRequestResponse({ type: KVStoreBadRequestErrorResponse})
@ApiNotFoundResponse({ type: KVStoreNotFoundErrorResponse})
@UseInterceptors(BaseInterceptor, KVStoreInterceptor)
@Controller('kv-store')
export class KvStoreController {
  constructor(private readonly kvStoreService: KvStoreService) {}
  
  @Post('session')
  async createSession(
    @Body() data: SaveSessionDto,
    @DeviceType() deviceType: string){
    const session = await this.kvStoreService.generateSessionKey(data.id, deviceType)
    return await this.kvStoreService.createSession({id: session})
  }
  @Get('session/:id')
  async getSession(@Param() data: SaveSessionDto){
    return await this.kvStoreService.getSession(data)
  }

  @Patch('session/verification')
  async setVerificationProps(@Body() data: UpdateVerifyDto){
    return await this.kvStoreService.setVerificationProps(data)
  }
  
  @Patch('session/block')
  async blockSession(@Body() data: SaveSessionDto){
    return await this.kvStoreService.blockSession(data)
  }

  @Patch('session/active')
  async activeSession(@Body() data: SaveSessionDto){
    return await this.kvStoreService.activeSession(data)
  }

  @Delete('session/:id')
  async deleteSession(@Param() data: SaveSessionDto){
    return await this.kvStoreService.deleteSession(data)
  }

}
