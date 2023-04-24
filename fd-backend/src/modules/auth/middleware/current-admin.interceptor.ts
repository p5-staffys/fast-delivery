import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { IAdmin } from 'src/modules/admin/interface/admin.interface';
import { AdminService } from '../../admin/admin.service';
import { AdminAuthService } from '../admin-auth.service';

@Injectable()
export class CurrentAdminInterceptor implements NestInterceptor {
  constructor(
    private adminAuthService: AdminAuthService,
    private adminService: AdminService,
  ) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request: CurrentAdminRequest = context.switchToHttp().getRequest();
    const idToken: string = request.headers.authorization;
    const _id = (await this.adminAuthService.authenticate(idToken)).uid;
    if (_id) {
      try {
        const user = await this.adminService.findById(_id);
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

export interface CurrentAdminRequest extends Request {
  currentUser?: IAdmin;
}
