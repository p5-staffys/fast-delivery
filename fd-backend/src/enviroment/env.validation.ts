import { plainToClass } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min, validateSync } from 'class-validator';

class EnvironmentVariables {
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  PORT: number;
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
