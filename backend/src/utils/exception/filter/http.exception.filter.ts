import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Injectable,
  Inject,
} from '@nestjs/common';
import { TechnicalException } from '../technical.exception';
import { FunctionalException } from '../functional.exception';
import { LoggerService } from '../../logger/logger.service';

@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(LoggerService)
    private readonly loggerService: LoggerService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    // Log errors
    const { ip, method, originalUrl } = request;
    if (status >= 400) {
      this.loggerService.log({
        method: method,
        originalUrl: originalUrl,
        statusCode: status,
        message: exception.message,
        ip: ip,
      });
      // Overwrite the error message to avoid displaying sensitive information publicly
      if (status >= 500) {
        exception.message = 'Something went wrong';
      }
    }

    const errorResponse = {
      statusCode: status,
      message: exception.message,
      pathUrl: request.url,
      timestamp: new Date().toLocaleString('fr', { timeZone: 'Europe/Paris' }),
    };

    if (
      exception instanceof TechnicalException ||
      exception instanceof FunctionalException
    ) {
      errorResponse['error'] = exception.error;
      errorResponse['fix'] = exception.fix;
      errorResponse['moreInfoUrl'] = exception.moreInfoUrl;
    } else {
      errorResponse['error'] = (exception.getResponse() as any).error;
    }

    const entries = Object.entries(errorResponse);
    entries.sort((a, b) => a[0].localeCompare(b[0]));
    const result = Object.fromEntries(entries);

    response.status(status).json(result);
  }
}
