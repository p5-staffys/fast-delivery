import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthGuard } from '../auth/middleware/auth.guard';
import { AdminAuthService } from '../auth/admin-auth.service';
import { Admin, AdminSchema } from './entities/admin.entity';
import { AuthService } from '../auth/auth.service';
import { AdminGuard } from '../auth/middleware/admin.guard';

@Module({
  imports: [
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
    AdminAuthService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AdminGuard,
    },
  ],
})
export class AdminModule {}
