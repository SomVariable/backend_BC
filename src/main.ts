import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config/dist';
import configuration from './configuration/configuration'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService()
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors({ credentials: true, origin: true });
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true}));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  const swaggerConfig = new DocumentBuilder()
    .setTitle('authorization task')
    .setDescription('-')
    .setVersion('1.0')
    .addTag('authorization')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get('PORT'));
}
bootstrap();
