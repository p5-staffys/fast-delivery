import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../../modules/user/entities/user.entity';
import {
  Admin,
  AdminDocument,
} from '../../modules/admin/entities/admin.entity';
import { CreateDBUserDto } from '../../modules/user/dtos/create-user.dto';
import {
  UserLogs,
  UserLogsDocument,
} from '../../common/modules/userLogs/entities/userLogs.entities';

@Injectable()
export class SeedUsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    @InjectModel(UserLogs.name)
    private readonly userLogsModel: Model<UserLogsDocument>,
  ) {}

  async dropUsers() {
    this.userModel.collection.drop();
  }

  async createUsers() {
    const users: CreateDBUserDto[] = [
      {
        _id: 'AxUd8B5XTvb66tzpDZaRrXPVzDH3',
        name: 'Francisco',
        lastName: 'Alvarez Raineri',
        email: 'franciscoalvarezraineri@gmail.com',
      },
      {
        _id: 'CCs3cBEwGXcYNwKvTfBB49nFTfG2',
        name: 'German',
        lastName: 'Rivarola',
        email: 'german@gmail.com',
      },
      {
        _id: 'BNfnN82tepaHviOmnzXyfROWNAi2',
        name: 'Pablo',
        lastName: 'Burgos',
        email: 'pablo@gmail.com ',
      },
      {
        _id: 'DYHhm16IteZ5AZcyRZL9ite6iFz2',
        name: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
      },
      {
        _id: '5xkuSzPwZ0dwv6vdwRcwriGBYlz1',
        name: 'Gabriel',
        lastName: 'Penise',
        email: 'penise.gabriel@gmail.com',
      },
    ];

    this.userModel.create(users);
  }

  async dropAdmins() {
    this.adminModel.collection.drop();
  }

  async createAdmin() {
    const admins: CreateDBUserDto[] = [
      {
        _id: 'tAOHWYOyM8ZsgELhvLxvnaauKqf2',
        name: 'admin',
        lastName: 'admin',
        email: 'admin@admin.com',
      },
      {
        _id: 'fzIGiTIyx9WQmFVWIINGLcLRaZ32',
        name: 'German',
        lastName: 'admin',
        email: 'german_admin@gmail.com',
      },
      {
        _id: 'hYWhfVJGGYQwwPucWgu3wLdGoVi2',
        name: 'Pablo',
        lastName: 'admin',
        email: 'pablo_admin@gmail.com',
      },
    ];
    this.adminModel.create(admins);
  }

  async dropUserLogs() {
    this.userLogsModel.collection.drop();
  }
}
