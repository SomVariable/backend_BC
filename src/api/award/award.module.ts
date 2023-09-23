import { Module } from '@nestjs/common';
import { AwardService } from './award.service';
import { AwardController } from './award.controller';
import { DatabaseModule } from 'src/api/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AwardController],
  providers: [AwardService],
})
export class AwardModule {}
