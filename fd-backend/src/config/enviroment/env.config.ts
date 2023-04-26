import { ConfigModule, registerAs } from '@nestjs/config';
import { validate } from './env.validation';

//Here call all .env vars
export const environments = registerAs('config', () => ({
  PORT: process.env.PORT || 8080,
  DB: {
    MONGODB: process.env.MONGODB,
  },
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
}));

export default ConfigModule.forRoot({
  load: [environments],
  isGlobal: true,
  validate,
});
