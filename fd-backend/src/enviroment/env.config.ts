import { ConfigModule, registerAs } from '@nestjs/config';
import { validate } from './env.validation';

//Here call all .env vars
export const environments = registerAs('config', () => ({
  PORT: process.env.PORT || 8080,
  DB: {
    MONGODB: process.env.MONGODB,
  },
  COGNITO: {
    USER_POOL_ID: process.env.USER_POOL_ID,
    CLIENT_ID: process.env.CLIENT_ID,
  },
  AWS: {
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  },
}));

export default ConfigModule.forRoot({
  load: [environments],
  isGlobal: true,
  validate,
});
