import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AdminAuthService } from './admin-auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AdminAuthService],
  imports: [UserModule],
})
export class AuthModule {}
