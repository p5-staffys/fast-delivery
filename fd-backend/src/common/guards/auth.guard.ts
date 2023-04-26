import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { auth } from '../firebase/auth.service';
import { Request } from 'express';
import { GeneralError } from '../error-handlers/exceptions';

@Injectable()
export class AuthGuard implements CanActivate {
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
      const _id = (await auth.verifyIdToken(idToken)).uid;
      if (_id) return true;
    } catch {
      throw new GeneralError(
        'Credenciales invalidas o caducadas, por favor volve a ingresar',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
