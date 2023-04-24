import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AdminAuthService } from './admin-auth.service';

@Module({
  providers: [AdminAuthService],
  imports: [UserModule],
})
export class AuthModule {}
