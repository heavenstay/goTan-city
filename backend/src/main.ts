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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  const loggerService = new LoggerService();
  app.useGlobalFilters(new HttpExceptionFilter(loggerService));

  await app.listen(3000);
}
bootstrap();
