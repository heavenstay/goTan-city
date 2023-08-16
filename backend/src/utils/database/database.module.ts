import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { PG_CONNECTION } from './database.constant';
import { Pool } from 'pg';

const DbProvider = {
  provide: PG_CONNECTION,
  useFactory: (configService: ConfigService) => {
    return new Pool({
      host: configService.get<string>('DB_HOST'),
      port: +configService.get<number>('DB_PORT'),
      database: configService.get<string>('DB_NAME'),
      user: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
    });
  },
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule],
  providers: [DbProvider, DatabaseService],
  exports: [DatabaseService, DbProvider],
})
export class DatabaseModule {}
