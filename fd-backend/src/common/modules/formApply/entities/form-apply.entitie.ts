import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IForm, IFormDB } from '../interface/form-apply.interface';

@Schema({ _id: false, timestamps: false })
export class FormDetails implements IForm {
  @Prop({ required: true, type: Boolean, default: true })
  readonly bebidasAlcoholicas: boolean;

  @Prop({ required: true, type: Boolean, default: true })
  readonly medicamentosPsicoactivos: boolean;

  @Prop({ required: true, type: Boolean, default: true })
  readonly problemaEmocional: boolean;
}

export const FormDetailsSchema = SchemaFactory.createForClass(FormDetails);

export type FormDocument = HydratedDocument<Form>;

@Schema({ _id: false })
export class Form implements IFormDB {
  @Prop({ required: true, type: FormDetailsSchema })
  form: IForm;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true, type: Boolean, default: false })
  ok: boolean;
}

export const FormSchema = SchemaFactory.createForClass(Form);
