import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { environments } from 'src/enviroment/env.config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { JwtAccessStrategy } from './strategy/jwt.strategy';
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [environments.KEY],

      useFactory: (configService: ConfigType<typeof environments>) => {
        return {
          secret: configService.JWT_ACCESS_SECRET,
          signOptions: {
            expiresIn: '10d',
          },
        };
      },
    }),
    UserModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy],
})
export class AuthModule {}
