import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(LoggerService)
    public loggerService: LoggerService,
  ) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      // Log valid request
      if (statusCode < 400) {
        this.loggerService.log({
          method: method,
          originalUrl: originalUrl,
          statusCode: statusCode,
          message: 'Request Successful.',
          ip: ip,
        });
      }
    });

    next();
  }
}
