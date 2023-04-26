import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

import { auth } from '../firebase/auth.service';
import { IS_PUBLIC_KEY } from './auth.guard';
import { GeneralError } from '../error-handlers/exceptions';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest();
    const idToken: string = request.headers.authorization;
    try {
      const admin = (await auth.verifyIdToken(idToken)).admin;
      if (admin) return true;
    } catch {
      throw new GeneralError(
        'Credenciales invalidas o caducadas, por favor volve a ingresar',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
