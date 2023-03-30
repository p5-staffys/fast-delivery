import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IAdress } from '../interface/address.interface';

@Schema({ _id: false })
export class Address implements IAdress {
  // @Prop({ required: true, type: String })
  // city: string;

  @Prop({ required: true, type: String })
  street: string;

  // @Prop({ required: true, type: String })
  // number: string;

  // @Prop({ type: String })
  // reference: string;
}

export const AdressRefSchema = SchemaFactory.createForClass(Address);
