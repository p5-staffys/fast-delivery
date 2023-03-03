//Here Settings for db || NOT SCHEMA
//Here Settings for db || NOT SCHEMA
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { environments } from 'src/enviroment/env.config';

export const mongoModuleSetting = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [environments.KEY],
  useFactory: (configService: ConfigType<typeof environments>) => {
    return {
      uri: configService.MONGODB,
    };
  },
});
