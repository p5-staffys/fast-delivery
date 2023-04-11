import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class FormAplyDto {
  @IsBoolean()
  @ApiProperty({ type: Boolean, example: true })
  bebidasAlcoholicas: boolean;

  @IsBoolean()
  @ApiProperty({ type: Boolean, example: true })
  medicamentosPsicoactivos: boolean;

  @IsBoolean()
  @ApiProperty({ type: Boolean, example: true })
  problemaEmocional: boolean;
}
