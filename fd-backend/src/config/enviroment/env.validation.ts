import { plainToClass } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  MONGODB: string;

  // @IsNotEmpty()
  // @IsString()
  // USER_POOL_ID: string;

  // @IsNotEmpty()
  // @IsString()
  // CLIENT_ID: string;

  // @IsNotEmpty()
  // @IsString()
  // ACCESS_KEY_ID: string;

  // @IsNotEmpty()
  // @IsString()
  // SECRET_ACCESS_KEY: string;

  @IsNotEmpty()
  @Min(1)
  @IsNumber()
  REQUEST_LIMIT: number;
}

export const validate = (
  config: Record<string, unknown>,
): EnvironmentVariables => {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) throw new Error(errors.toString());

  return validatedConfig;
};
