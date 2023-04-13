import { Module } from '@nestjs/common';

import ConfigModule from './config/enviroment/env.config';
import { RoutesModule } from './modules/routes.module';
import { DevRoutesModule } from './devModules/routes-dev.module';
import { mongoModuleSetting } from './config/database/db.config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    ConfigModule,
    RoutesModule,
    DevRoutesModule,
    mongoModuleSetting,
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
})
export class AppModule {}
