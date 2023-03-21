import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreatePackageDto,
  ResponseCreatePackageDto,
} from './dto/create-package.dto';

import { Package, PackageDocument } from './entities/package.entity';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Package.name)
    private readonly packageModel: Model<PackageDocument>,
  ) {}

  async create(
    newPackage: CreatePackageDto,
  ): Promise<ResponseCreatePackageDto> {
    return await this.packageModel.create(newPackage);
  }

  async getById(_id: string) {
    return `returns one package by Id. id: ${_id}`;
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
