import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { User, UserSchema } from './entities/user.entity';
import { CurrentUserInterceptor } from '../auth/middleware/current-user.interceptor';

import { AdminAuthService } from '../auth/admin-auth.service';
import { UserRepository } from './repository/user.repository';
import { AuthGuard } from '../auth/middleware/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AdminAuthService,
    UserRepository,
    CurrentUserInterceptor,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [
    UserService,
    CurrentUserInterceptor,
    AdminAuthService,
    UserRepository,
  ],
})
export class UserModule {}
