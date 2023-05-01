import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IAdress, Ilatlng } from '../interface/address.interface';

@Schema({ _id: false })
export class Address implements IAdress {
  @Prop({ required: true, type: String })
  number: string;

  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  street: string;

  @Prop({ required: true, type: String })
  state: string;

  @Prop({ required: true, type: String })
  country: string;
}

export const AdressRefSchema = SchemaFactory.createForClass(Address);

@Schema({ _id: false })
export class latlng implements Ilatlng {
  @Prop({ required: true, type: Number })
  lat: number;

  @Prop({ required: true, type: Number })
  lng: number;
}

export const latlngSchema = SchemaFactory.createForClass(latlng);
