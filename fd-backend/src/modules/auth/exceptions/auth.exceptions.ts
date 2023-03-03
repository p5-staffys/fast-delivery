import { HttpException, HttpStatus } from '@nestjs/common';

//Verificar si podemos hacerlo 1 sola clase o si  o si hay que extender de HttpException como dice la docu
export class EmailExists extends HttpException {
  constructor() {
    super('El email ya existe.', HttpStatus.BAD_REQUEST);
  }
}

export class InvalidCredentials extends HttpException {
  constructor() {
    super('Credenciales invalidas.', HttpStatus.UNAUTHORIZED);
  }
}

export class UserIsNotActive extends HttpException {
  constructor() {
    super('El usuario no esta activo.', HttpStatus.UNAUTHORIZED);
  }
}
