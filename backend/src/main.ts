import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { LoggerService } from './utils/logger/logger.service';
import { HttpExceptionFilter } from './utils/exception/filter/http.exception.filter';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Gotan city API')
    .setDescription('This the swagger documentation of the Gotan city API !')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);
}

function setupHeaders(app: INestApplication<any>) {
  // Set up cors headers
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
}

function setupGlobalFilters(app: INestApplication<any>) {
  const loggerService = new LoggerService();
  app.useGlobalFilters(new HttpExceptionFilter(loggerService));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  setupHeaders(app);

  setupGlobalFilters(app);

  await app.listen(3000);
}
bootstrap();
