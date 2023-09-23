import { Module } from '@nestjs/common';
import { CategoryTranslationService } from './category-translation.service';
import { DatabaseModule } from '../database/database.module';
import { CategoryTranslationController } from './category-translation.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryTranslationController],
  providers: [CategoryTranslationService],
  exports: [CategoryTranslationService],
})
export class CategoryTranslationModule {}
