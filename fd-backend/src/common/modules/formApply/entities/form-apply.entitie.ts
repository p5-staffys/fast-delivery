import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema({ _id: false, timestamps: true })
export class FormRef {
  @Prop({ required: true, type: Boolean, default: true })
  readonly bebidasAlcoholicas: Boolean;

  @Prop({ required: true, type: Boolean, default: true })
  readonly medicamentosPsicoactivos: Boolean;

  @Prop({ required: true, type: Boolean, default: true })
  readonly problemaEmocional: Boolean;
}

export const formRefSchema = SchemaFactory.createForClass(FormRef);
