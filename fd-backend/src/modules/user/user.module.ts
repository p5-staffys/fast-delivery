import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { User, UserSchema } from './entities/user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

import { AuthService } from '../../common/firebase/auth.service';
import { UserRepository } from './repository/user.repository';

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
  providers: [UserService, AuthService, UserRepository, CurrentUserInterceptor],
  exports: [UserService, CurrentUserInterceptor, AuthService, UserRepository],
})
export class UserModule {}
