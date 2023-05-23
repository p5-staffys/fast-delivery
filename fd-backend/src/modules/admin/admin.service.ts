import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateDBAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { AdminRepository } from './repository/admin.repository';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async create(newAdmin: CreateDBAdminDto) {
    return await this.adminRepository.createEntity(newAdmin);
  }

  async update(_id: string, updateData: UpdateAdminDto): Promise<Admin> {
    const user = await this.adminRepository.updateEntityOrFail(
      { _id },
      updateData,
    );
    return user;
  }

  async checkAdminId(_id: string): Promise<void> {
    const response = await this.adminRepository.checkAdminId(_id);
    if (response)
      throw new BadRequestException('Un admin ya esta registrado con ese id');
  }

  async checkAdminEmail(email: string): Promise<void> {
    const response = await this.adminRepository.checkAdminEmail(email);
    if (response)
      throw new BadRequestException(
        'Un admin ya esta registrado con ese email',
      );
  }

  async findById(_id: string) {
    return this.adminRepository.findOneById(_id);
  }
}
