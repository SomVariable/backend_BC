import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { DatabaseModule } from 'src/api/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
