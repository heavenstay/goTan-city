import { Module } from '@nestjs/common';
import { DatabaseModule } from '../utils/database/database.module';
import { LayersController } from './layers.controller';
import { LayersService } from './layers.service';
import { LayersRepository } from './layers.repositoy';

@Module({
  imports: [DatabaseModule],
  controllers: [LayersController],
  providers: [LayersService, LayersRepository],
})
export class LayersModule {}
