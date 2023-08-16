import { HttpException } from '@nestjs/common';

export class TechnicalException extends HttpException {
  constructor(message: string) {
    console.log(message);
    const error = 'internal_server_error';

    super(error, 500);
    this.error = error;
    this.message = message;

    this.fix = 'Retry later.';
    this.moreInfoUrl =
      'https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#5xx_server_errors';
  }
  error: string;
  message: string;

  fix?: string;
  moreInfoUrl?: string;
}
