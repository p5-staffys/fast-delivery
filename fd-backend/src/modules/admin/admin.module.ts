import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from '../../common/firebase/auth.service';
import { Admin, AdminSchema } from './entities/admin.entity';
import { AdminRepository } from './repository/admin.repository';
import { CurrentAdminInterceptor } from './interceptors/current-admin.interceptor';
import { UserModule } from '../user/user.module';
import { PackageModule } from '../package/package.module';

@Module({
  imports: [
    UserModule,
    PackageModule,
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    AuthService,
    AdminRepository,
    CurrentAdminInterceptor,
  ],
})
export class AdminModule {}
