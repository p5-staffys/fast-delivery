import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { auth } from '../admin-auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const idToken = request.cookies['idToken'];
    try {
      const admin = (await auth.verifyIdToken(idToken)).admin;
      return admin;
    } catch {
      return false;
    }
  }
}
