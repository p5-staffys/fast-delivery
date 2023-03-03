import { ConfigModule, registerAs } from '@nestjs/config';
import { validate } from './env.validation';

//Here call all .env vars
export const environments = registerAs('config', () => {
  return {
    MONGODB: process.env.MONGODB,
    PORT: process.env.PORT || 8080,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  };
});

export default ConfigModule.forRoot({
  load: [environments],
  isGlobal: true,
  validate,
});
