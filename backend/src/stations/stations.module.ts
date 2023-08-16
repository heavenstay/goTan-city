import { Module } from '@nestjs/common';
import { DatabaseModule } from '../utils/database/database.module';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { StationsRepository } from './stations.repositoy';

@Module({
  imports: [DatabaseModule],
  controllers: [StationsController],
  providers: [StationsService, StationsRepository],
})
export class StationsModule {}
