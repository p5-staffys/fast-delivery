import { Module } from '@nestjs/common';

import ConfigModule from './config/enviroment/env.config';
import { RoutesModule } from './modules/routes.module';
import { DevRoutesModule } from './devModules/routes-dev.module';
import { mongoModuleSetting } from './config/database/db.config';

@Module({
  imports: [ConfigModule, RoutesModule, DevRoutesModule, mongoModuleSetting],
})
export class AppModule {}
