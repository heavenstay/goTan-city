import { HttpException, HttpStatus } from '@nestjs/common';

export class FunctionalException extends HttpException {
  constructor(
    statusCode: HttpStatus,
    error: string,
    message: string,
    fix?: string,
    moreInfoUrl?: string,
  ) {
    super(error, statusCode);
    this.error = error;
    this.message = message;

    this.fix = fix;
    this.moreInfoUrl = moreInfoUrl;
  }

  error: string;
  message: string;

  fix?: string;
  moreInfoUrl?: string;
}
