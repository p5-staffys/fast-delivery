import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { IAdmin } from '../interfaces/admin.interface';
import { AdminService } from '../admin.service';
import { AuthService } from '../../../common/firebase/auth.service';

@Injectable()
export class CurrentAdminInterceptor implements NestInterceptor {
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
  ) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request: CurrentAdminRequest = context.switchToHttp().getRequest();
    const idToken: string = request.headers.authorization;
    const _id = (await this.authService.authenticate(idToken)).uid;
    if (_id) {
      try {
        const admin = await this.adminService.findById(_id);
        request.currentAdmin = admin;
      } catch {
        throw new NotFoundException(
          'Por favor ingresa tu email y password nuevamente',
        );
      }
    }
    return handler.handle();
  }
}

export interface CurrentAdminRequest extends Request {
  currentAdmin?: IAdmin;
}
