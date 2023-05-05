import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsString } from 'class-validator';
import { IForm, IFormApply, IFormDB } from '../interface/form-apply.interface';

export class FormDto implements IForm {
  @IsBoolean()
  @ApiProperty({ type: Boolean, example: false })
  bebidasAlcoholicas: boolean;

  @IsBoolean()
  @ApiProperty({ type: Boolean, example: false })
  medicamentosPsicoactivos: boolean;

  @IsBoolean()
  @ApiProperty({ type: Boolean, example: false })
  problemaEmocional: boolean;
}

export class FormAplyDto implements IFormApply {
  @IsString()
  @ApiProperty({ type: String, example: '2023-12-25' })
  date: string;

  @IsObject()
  @ApiProperty({ type: FormDto })
  form: FormDto;
}

export class FormDBDto implements IFormDB {
  @IsString()
  @ApiProperty({ type: Date, example: '2023-12-25' })
  date: Date;

  @IsBoolean()
  @ApiProperty({ type: Boolean, example: true })
  ok: boolean;

  @IsObject()
  @ApiProperty({ type: FormDto })
  form: FormDto;
}
