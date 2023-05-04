import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { IFormApply } from '../interface/form-apply.interface';

export class FormAplyDto implements IFormApply {
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
