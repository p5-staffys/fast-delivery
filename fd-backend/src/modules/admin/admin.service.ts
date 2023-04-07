import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Admin, AdminDocument } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
  ) {}

  async create(newAdmin) {
    const uniqueId = await this.adminModel.findById(newAdmin._id);

    if (uniqueId && uniqueId._id)
      throw new BadRequestException(
        'Un usuario ya se encuentra registrado con ese id',
      );

    const uniqueMail = await this.adminModel.findOne({
      email: newAdmin.email,
    });

    if (uniqueMail && uniqueMail.email)
      throw new BadRequestException(
        'Un usuario ya se encuentra registrado con ese correo',
      );

    return await this.adminModel.create(newAdmin);
  }

  async getUsers() {
    return 'Returns all users';
  }

  async getActiveUsers() {
    return 'Returns amount of active users';
  }

  async getPackages() {
    return 'Returns all packages';
  }

  async getActivePackages() {
    return 'Returns amount of active packages';
  }

  async changeUserStatus(_id) {
    return `Changes user ${_id} status`;
  }
}
