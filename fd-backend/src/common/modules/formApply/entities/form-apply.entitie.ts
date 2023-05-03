import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IFormApply } from '../interface/form-apply.interface';

@Schema({ _id: false, timestamps: true })
export class FormRef implements IFormApply {
  @Prop({ required: true, type: String })
  readonly day: string;

  @Prop({ required: true, type: Boolean, default: true })
  readonly bebidasAlcoholicas: boolean;

  @Prop({ required: true, type: Boolean, default: true })
  readonly medicamentosPsicoactivos: boolean;

  @Prop({ required: true, type: Boolean, default: true })
  readonly problemaEmocional: boolean;
}

export const formRefSchema = SchemaFactory.createForClass(FormRef);
