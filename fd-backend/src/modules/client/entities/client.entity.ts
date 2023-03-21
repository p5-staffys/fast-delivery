import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PackageRefSchema } from 'src/modules/package/entities/package.entity';
import { IPackageRef } from 'src/modules/package/interface/package.interface';

import { IAdress, IClient, IClientRef } from '../interface/client.interface';

@Schema()
export class Address implements IAdress {
  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  street: string;

  @Prop({ required: true, type: String })
  number: string;

  @Prop({ type: String })
  reference: string;
}

export const AdressRefSchema = SchemaFactory.createForClass(Address);

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client implements Partial<IClient> {
  @Prop({ required: true, type: String })
  fullName: string;

  @Prop({ default: [], type: [PackageRefSchema] })
  packages: IPackageRef[];

  @Prop({ required: true, type: AdressRefSchema })
  adress: IAdress;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

@Schema()
export class ClientRef implements IClientRef {
  @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true, type: String })
  fullName: string;

  @Prop({ required: true, type: AdressRefSchema })
  adress: IAdress;
}

export const ClientRefSchema = SchemaFactory.createForClass(ClientRef);
