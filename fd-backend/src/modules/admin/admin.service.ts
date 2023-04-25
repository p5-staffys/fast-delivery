import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateDBAdminDto } from './dtos/create-admin.dto';
import { Admin, AdminDocument } from './entities/admin.entity';
import { AdminRepository } from './repository/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    private readonly adminRepository: AdminRepository,
  ) {}

  async create(newAdmin: CreateDBAdminDto) {
    return await this.adminModel.create(newAdmin);
  }

  async checkAdminId(_id: string): Promise<void> {
    const response = await this.adminRepository.checkAdminId(_id);
    if (response)
      throw new BadRequestException('El admin ya esta registrado con ese id');
  }

  async checkAdminEmail(email: string): Promise<void> {
    const response = await this.adminRepository.checkAdminEmail(email);
    if (response)
      throw new BadRequestException(
        'El admin ya esta registrado con ese email',
      );
  }

  async findById(_id: string) {
    return this.adminModel.findById(_id);
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
