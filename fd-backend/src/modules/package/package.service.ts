import { Injectable } from '@nestjs/common';

import { CreatePackageDto } from './dto/create-package.dto';
import { Package } from './entities/package.entity';

import { PackageRepository } from './repository/package.repository';
import { Types } from 'mongoose';

@Injectable()
export class PackageService {
  constructor(private readonly packageRepository: PackageRepository) {}

  async create(newPackage: CreatePackageDto): Promise<Package> {
    return await this.packageRepository.createEntity(newPackage);
  }

  async getPendingPackage(page?: number, limit?: number): Promise<Package[]> {
    return await this.packageRepository.pendingPackage(page, limit);
  }

  async getById(_id: Types.ObjectId): Promise<Package> {
    return await this.packageRepository.getPackageById(_id);
  }

  async assignToUser(_id: string, user_id: string) {
    return `Assign package to user. id: ${_id}, user_id: ${user_id}`;
  }

  async unassignFromUser(_id: string) {
    return `Unassign package from user. id: ${_id}`;
  }

  async modifyPackage(_id: string, newPackage) {
    return `Package modified. id: ${_id}, changes: ${newPackage}`;
  }

  async delete(_id: string) {
    return `Delete package by id. id: ${_id}`;
  }

  async delivered(_id: string) {
    return `Package has been delivered. id: ${_id}`;
  }
}
