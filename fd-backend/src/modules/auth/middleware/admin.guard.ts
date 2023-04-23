import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { auth } from '../admin-auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const idToken: string = request.headers.authorization;
    try {
      const admin = (await auth.verifyIdToken(idToken)).admin;
      return admin;
    } catch {
      return false;
    }
  }
}
