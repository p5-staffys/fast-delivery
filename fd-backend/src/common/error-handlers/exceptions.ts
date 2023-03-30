import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFound extends HttpException {
  constructor(private readonly entity: string) {
    super(`${entity} not found.`, HttpStatus.NOT_FOUND);
  }
}

export class GeneralError extends HttpException {
  constructor(
    private readonly error: string,
    private readonly statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(error, statusCode);
  }
}
