import { BadRequestException, Injectable } from '@nestjs/common';

import { CreatePackageDto } from './dto/create-package.dto';
import { Package } from './entities/package.entity';

import { PackageRepository } from './repository/package.repository';
import { Types } from 'mongoose';
import { IUser } from '../user/interface/user.interface';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class PackageService {
  constructor(
    private readonly packageRepository: PackageRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(newPackage: CreatePackageDto): Promise<Package> {
    return await this.packageRepository.createEntity(newPackage);
  }

  async getPendingPackage(page?: number, limit?: number): Promise<Package[]> {
    return await this.packageRepository.findPendingPackages(page, limit);
  }

  async getById(_id: Types.ObjectId): Promise<Package> {
    return await this.packageRepository.getPackageById(_id);
  }

  async assignToUser(_id: Types.ObjectId, user: IUser): Promise<Package> {
    const { name, lastName } = user;
    const pack = await this.packageRepository.findPendingPackageById(_id);
    pack.deliveredBy = { name, lastName, _id: user._id };
    const form = await this.userRepository.foundUserAndValidateForm(user._id);
    const { bebidasAlcoholicas, medicamentosPsicoactivos, problemaEmocional } =
      form.forms[0];
    if (!bebidasAlcoholicas && medicamentosPsicoactivos && problemaEmocional)
      throw new BadRequestException(
        'No cumplis los requisitos minimos para trabajar durante el dia de hoy, proba nuevamente en 24hs',
      );

    return await this.packageRepository.updateEntityOrFail(_id, pack);
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
