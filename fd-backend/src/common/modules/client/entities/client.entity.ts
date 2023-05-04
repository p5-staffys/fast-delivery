import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  AdressRefSchema,
  latlngSchema,
} from '../../address/entities/address.entity';
import { IAdress, Ilatlng } from '../../address/interface/address.interface';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ _id: false })
export class Client {
  @Prop({ required: true, type: String })
  fullName: string;

  @Prop({ required: true, type: AdressRefSchema })
  address: IAdress;

  @Prop({ required: true, type: latlngSchema })
  latlng: Ilatlng;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

export type ClientRefDocument = HydratedDocument<ClientRef>;

@Schema({ _id: false })
export class ClientRef {
  @Prop({ required: true, type: String })
  fullName: string;

  @Prop({ required: true, type: String })
  address: string;
}

export const ClientRefSchema = SchemaFactory.createForClass(ClientRef);
