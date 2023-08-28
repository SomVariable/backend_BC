import { Module } from '@nestjs/common';
import { ContentItemService } from './content-item.service';
import { ContentItemController } from './content-item.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ContentItemController],
  providers: [ContentItemService]
})
export class ContentItemModule {}
