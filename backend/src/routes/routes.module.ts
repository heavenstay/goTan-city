import { Module } from '@nestjs/common';
import { DatabaseModule } from '../utils/database/database.module';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { RoutesRepository } from './routes.repositoy';

@Module({
  imports: [DatabaseModule],
  controllers: [RoutesController],
  providers: [RoutesService, RoutesRepository],
})
export class RoutesModule {}
