import { Module } from '@nestjs/common';

import ConfigModule from './enviroment/env.config';
import { RoutesModule } from './modules/routes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PackageModule } from './modules/package/package.module';

@Module({
  imports: [
    ConfigModule,
    RoutesModule,
    MongooseModule.forRoot('mongodb://localhost/fast-delivery'),
    PackageModule,
  ],
})
export class AppModule {}
