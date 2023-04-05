import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { AdminAuthService } from '../auth/admin-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';

import { CurrentUserInterceptor } from '../auth/current-user.interceptor';

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
    AuthService,
    AdminAuthService,
    CurrentUserInterceptor,
  ],
  exports: [UserService],
})
export class UserModule {}
