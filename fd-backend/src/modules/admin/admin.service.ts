import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateDBAdminDto } from './dtos/create-admin.dto';
import { AdminRepository } from './repository/admin.repository';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async create(newAdmin: CreateDBAdminDto) {
    return await this.adminRepository.createEntity(newAdmin);
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
