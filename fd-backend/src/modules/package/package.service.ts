import { BadRequestException, Injectable } from '@nestjs/common';

import { CreatePackageDto } from './dto/create-package.dto';
import { Package } from './entities/package.entity';

import { PackageRepository } from './repository/package.repository';
import { Types } from 'mongoose';
import { IUser } from '../user/interface/user.interface';
import { UserRepository } from '../user/repository/user.repository';
import { PackageStatus } from './interface/package.interface';

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
    const form = await this.userRepository.foundUserAndValidateForm(user._id);
    if (!form)
      throw new BadRequestException(
        'No hiciste tu formulario de hoy, tenes que hacerlo para poder continuar',
      );

    const { bebidasAlcoholicas, medicamentosPsicoactivos, problemaEmocional } =
      form.forms[form.forms.length - 1];

    if (bebidasAlcoholicas || medicamentosPsicoactivos || problemaEmocional)
      throw new BadRequestException(
        'No cumplis los requisitos minimos para trabajar durante el dia de hoy, proba nuevamente en 24hs',
      );
    const { name, lastName } = user;
    const updatePack = {
      deliveredBy: {
        name,
        lastName,
        _id: user._id,
      },
      status: PackageStatus.Delivering,
    };

    const actualPackageFilter = {
      _id,
      status: PackageStatus.New,
      deliveredBy: null,
    };

    return await this.packageRepository.updateEntityOrFail(
      { ...actualPackageFilter },
      { ...updatePack },
      null,
      'Package ID o Status invalido, solo puede ser "new" y no tener ningun repartidor asignado',
    );
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

  async delivered(_id: Types.ObjectId): Promise<Package> {
    const actualPackage = {
      _id,
      status: PackageStatus.Delivering,
    };

    const update = {
      status: PackageStatus.Delivered,
      deliveredOn: new Date(),
    };

    return await this.packageRepository.updateEntityOrFail(
      { ...actualPackage },
      { ...update },
      null,
      `ID o Status invalido, solo puede ser "${PackageStatus.Delivering}"`,
    );
  }
}
