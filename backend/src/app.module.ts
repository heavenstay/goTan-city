import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './utils/database/database.module';
import { LoggerService } from './utils/logger/logger.service';
import { LoggerMiddleware } from './utils/logger/logger.middleware';
import { LayersModule } from './layers/layers.module';
import { StationsModule } from './stations/stations.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    LayersModule,
    StationsModule,
    RoutesModule,
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
