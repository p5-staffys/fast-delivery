import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from '../auth/middleware/auth.guard';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AdminModule {}
