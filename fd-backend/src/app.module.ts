import { Module } from '@nestjs/common';

import ConfigModule from './enviroment/env.config';
import { RoutesModule } from './modules/routes.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule,
    RoutesModule,
    MongooseModule.forRoot('mongodb://localhost/fast-delivery'),
  ],
})
export class AppModule {}
