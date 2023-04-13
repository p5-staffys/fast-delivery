import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Package,
  PackageDocument,
} from '../../modules/package/entities/package.entity';

@Injectable()
export class SeedPackagesService {
  constructor(
    @InjectModel(Package.name)
    private readonly packageModel: Model<PackageDocument>,
  ) {}

  async dropPackages() {
    this.packageModel.collection.drop();
  }

  async createPackages() {
    this.packageModel.create([
      {
        weight: 10,
        createdBy: {
          _id: 'mDcPQJT4kTRyKCHfzQv5Qk0jbbd2',
          fullName: 'admin admin',
        },
        client: {
          fullName: 'Cliente 1',
          address: { street: 'calle falsa 124' },
        },
        deliveryDate: new Date(),
        status: 'peding',
      },
      {
        weight: 15,
        createdBy: {
          _id: 'mDcPQJT4kTRyKCHfzQv5Qk0jbbd2',
          fullName: 'admin admin',
        },
        deliveredBy: {
          _id: 'AxUd8B5XTvb66tzpDZaRrXPVzDH3',
          fullName: 'Francisco Alvarez Raineri',
        },
        client: {
          fullName: 'Cliente 1',
          address: { street: 'calle falsa 124' },
        },
        deliveryDate: new Date(),
        status: 'delivering',
      },
      {
        weight: 5,
        createdBy: {
          _id: 'mDcPQJT4kTRyKCHfzQv5Qk0jbbd2',
          fullName: 'admin admin',
        },
        deliveredBy: {
          _id: 'AxUd8B5XTvb66tzpDZaRrXPVzDH3',
          fullName: 'Francisco Alvarez Raineri',
        },
        client: {
          fullName: 'Cliente 1',
          address: { street: 'calle falsa 124' },
        },
        deliveryDate: new Date(),
        deliveryOn: new Date(),
        status: 'delivered',
      },
    ]);
  }
}
