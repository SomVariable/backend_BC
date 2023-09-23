import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { DatabaseModule } from 'src/api/database/database.module';
import { PhotoModule } from '../photo/photo.module';

@Module({
  imports: [DatabaseModule, PhotoModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
