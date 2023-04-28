//Here Settings for db || NOT SCHEMA
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { softDeletePlugin } from '../../common/database/softdelete/softDelete';
import { environments } from '../enviroment/env.config';

export const mongoModuleSetting = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [environments.KEY],
  useFactory: (configService: ConfigType<typeof environments>) => {
    return {
      uri: configService.DB.MONGODB,
      connectionFactory: (connection) => {
        connection.plugin(softDeletePlugin);
        return connection;
      },
    };
  },
});
