import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './entities/client.entity';
import {
  CreateClientDto,
  ResponseCreateClientDto,
} from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}
  async create(newClient: CreateClientDto): Promise<ResponseCreateClientDto> {
    return await this.clientModel.create(newClient);
  }
}
