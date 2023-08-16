import { Injectable, Logger } from '@nestjs/common';
import { LoggerDto } from './logger.dto';

@Injectable()
export class LoggerService {
  logger = new Logger('HTTP');

  log(loggerDto: LoggerDto) {
    const message = `${loggerDto.method} ${loggerDto.originalUrl} ${loggerDto.statusCode} - ${loggerDto.message} (${loggerDto.ip})`;

    if (loggerDto.statusCode >= 500) {
      this.logger.error(message);
    } else if (loggerDto.statusCode >= 400) {
      this.logger.warn(message);
    } else {
      this.logger.log(message);
    }
  }
}
