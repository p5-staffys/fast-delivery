import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common'

import { AuthService } from '../firebase/auth.service';

export const CurrentUser = createParamDecorator(async (data: string, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()
  const idToken: string = request.headers.authorization;
  const authService = new AuthService()
   const _id = (await authService.authenticate(idToken)).uid;
  if (_id) return _id
throw new NotFoundException(
  'Por favor ingresa tu email y password nuevamente',
);

})
