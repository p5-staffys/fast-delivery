import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthGuard } from '../auth/middleware/auth.guard';
import { AdminAuthService } from '../auth/admin-auth.service';
import { Admin, AdminSchema } from './entities/admin.entity';

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
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AdminModule {}
