import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from '../../../common/modules/firebase/auth.service';
import { UserService } from '../user.service';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request: CurrentUserRequest = context.switchToHttp().getRequest();
    const idToken: string = request.headers.authorization;
    const _id = (await this.authService.authenticate(idToken)).uid;
    if (_id) {
      try {
        const user = await this.userService.findById(_id);
        request.currentUser = user;
      } catch {
        throw new NotFoundException(
          'Por favor ingresa tu email y password nuevamente',
        );
      }
    }
    return handler.handle();
  }
}

export interface CurrentUserRequest extends Request {
  currentUser?: IUser;
}
