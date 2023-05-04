import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { User, UserSchema } from './entities/user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

import { AuthService } from '../../common/modules/firebase/auth.service';
import { UserRepository } from './repository/user.repository';
import { UserLogsModule } from 'src/common/modules/userLogs/userLogs.module';
import { PackageModule } from '../package/package.module';

@Module({
  imports: [
    UserLogsModule,
    PackageModule,
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
