import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { UserProfileModule } from './api/user-profile/user-profile.module';
import configuration from './configuration/configuration';
import { UserModule } from './api/user/user.module';
import { KvStoreModule } from './api/kv-store/kv-store.module';
import { JwtHelperModule } from './api/jwt-helper/jwt-helper.module';
import { DatabaseModule } from './api/database/database.module';
import { EducationModule } from './api/education/education.module';
import { ProfessionalInterestModule } from './api/professional-interest/professional-interest.module';
import { AwardModule } from './api/award/award.module';
import { NewsModule } from './api/news/news.module';
import { ContentItemModule } from './api/content-item/content-item.module';
import { AreaModule } from './area/area.module';
import { PracticeModule } from './practice/practice.module';
import { ServiceModule } from './service/service.module';
import { TagModule } from './tag/tag.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true
  }), 
  AuthModule, 
  UserProfileModule,
  UserModule, 
  KvStoreModule, 
  JwtHelperModule,
  DatabaseModule,
  EducationModule,
  ProfessionalInterestModule,
  AwardModule,
  NewsModule,
  ContentItemModule,
  AreaModule,
  PracticeModule,
  ServiceModule,
  TagModule,
  PhotoModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
