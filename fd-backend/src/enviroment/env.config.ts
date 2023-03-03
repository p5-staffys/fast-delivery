import { ConfigModule, registerAs } from '@nestjs/config';
import { validate } from './env.validation';

//Here call all .env vars
export const environments = registerAs('config', () => {
  return {
    PORT: process.env.PORT || 8080,
    USER_POOL_ID: process.env.USER_POOL_ID,
    CLIENT_ID: process.env.CLIENT_ID,
  };
});

export default ConfigModule.forRoot({
  load: [environments],
  isGlobal: true,
  validate,
});
