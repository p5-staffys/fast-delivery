import { Module } from '@nestjs/common';
import { mongoModuleSetting } from './database/db.config';
import ConfigModule from './enviroment/env.config';
import { RoutesModule } from './modules/routes.module';

@Module({
  imports: [ConfigModule, mongoModuleSetting, RoutesModule],
})
export class AppModule {}
