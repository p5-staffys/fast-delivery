import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema({ _id: false, timestamps: true })
export class FormRef {
  @Prop({ required: true, type: Boolean, default: true })
  readonly bebidasAlcoholicas: boolean;

  @Prop({ required: true, type: Boolean, default: true })
  readonly medicamentosPsicoactivos: boolean;

  @Prop({ required: true, type: Boolean, default: true })
  readonly problemaEmocional: boolean;
}

export const formRefSchema = SchemaFactory.createForClass(FormRef);
