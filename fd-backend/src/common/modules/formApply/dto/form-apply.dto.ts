import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { IFormApply } from '../interface/form-apply.interface';

export class FormAplyDto implements IFormApply {
  @IsString()
  @ApiProperty({ type: String, example: '25-12-2023' })
  day: string;

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
