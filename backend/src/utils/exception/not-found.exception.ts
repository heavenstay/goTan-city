import { HttpStatus } from '@nestjs/common';
import { FunctionalException } from './functional.exception';

export class NotFoundException extends FunctionalException {
  constructor(
    message = 'This resource was not found',
    solution = 'Try to provide a valid identifier',
    reference = 'https://en.wikipedia.org/wiki/HTTP_404',
  ) {
    super(HttpStatus.NOT_FOUND, 'not_found', message, solution, reference);
  }
}
