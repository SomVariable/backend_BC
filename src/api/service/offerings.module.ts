import { Module } from '@nestjs/common';
import { OfferingsService } from './offerings.service';
import { OfferingsController } from './offerings.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OfferingsController],
  providers: [OfferingsService]
})
export class OfferingsModule {}
