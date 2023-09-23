import { Module } from '@nestjs/common';
import { ProfessionalInterestService } from './professional-interest.service';
import { ProfessionalInterestController } from './professional-interest.controller';
import { DatabaseModule } from 'src/api/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfessionalInterestController],
  providers: [ProfessionalInterestService],
})
export class ProfessionalInterestModule {}
