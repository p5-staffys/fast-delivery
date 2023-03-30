import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AdressRefSchema } from '../../address/entities/address.entity';
import { IAdress } from '../../address/interface/address.interface';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ _id: false })
export class Client {
  @Prop({ required: true, type: String })
  fullName: string;

  @Prop({ required: true, type: AdressRefSchema })
  address: IAdress;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
