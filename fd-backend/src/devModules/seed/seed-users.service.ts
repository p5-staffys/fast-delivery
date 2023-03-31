import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../../modules/user/entities/user.entity';
import {
  Admin,
  AdminDocument,
} from '../../modules/admin/entities/admin.entity';

@Injectable()
export class SeedUsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
  ) {}

  async dropUsers() {
    this.userModel.collection.drop();
  }

  async createUsers() {
    this.userModel.create([
      {
        _id: 'AxUd8B5XTvb66tzpDZaRrXPVzDH3',
        name: 'Francisco',
        lastName: 'Alvarez Raineri',
        email: 'franciscoalvarezraineri@gmail.com',
        packages: [
          {
            _id: '',
            status: 'delivering',
            address: 'calle falsa 123',
            deliveryDate: new Date(),
          },
          {
            _id: '',
            status: 'delivering',
            address: 'calle false 124',
            deliveryDate: new Date(),
          },
          {
            _id: '',
            status: 'delivered',
            address: 'calle false 125',
            deliveryDate: new Date(),
          },
        ],
      },
      {
        _id: 'CCs3cBEwGXcYNwKvTfBB49nFTfG2',
        name: 'Juan Carlos',
        lastName: 'Macanudo',
        email: 'juancarlosmacanudo@gmail.com',
        status: 'active',
      },
      {
        _id: 'DYHhm16IteZ5AZcyRZL9ite6iFz2',
        name: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        rating: 2,
      },
    ]);
  }

  async dropAdmins() {
    this.adminModel.collection.drop();
  }

  async createAdmin() {
    this.adminModel.create({
      _id: 'mDcPQJT4kTRyKCHfzQv5Qk0jbbd2',
      name: 'admin',
      lastName: 'admin',
      email: 'admin@admin.com',
    });
  }
}
