import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

import { AdminAuthService } from '../admin-auth.service';
import { UserService } from '../../user/user.service';
import { IUser } from '../../user/interface/user.interface';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private adminAuthService: AdminAuthService,
    private userService: UserService,
  ) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const idToken = request.cookies['idToken'];
    const _id = (await this.adminAuthService.authenticate(idToken)).uid;
    if (_id) {
      const user = await this.userService.findById(_id);
      request.currentUser = user;
    }
    return handler.handle();
  }
}

export interface CurrentUserRequest extends Request {
  currentUser: IUser;
}