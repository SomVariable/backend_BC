import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnApplicationShutdown {
  constructor(private configService: ConfigService) {}
  async onApplicationShutdown() {
    if (process.env.NODE_ENV === 'test') {
      await this.configService.get('store').getClient().quit();
    }
  }
}
