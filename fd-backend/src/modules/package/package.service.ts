import { BadRequestException, Injectable } from '@nestjs/common';

import { CreatePackageDto } from './dto/create-package.dto';
import { Package } from './entities/package.entity';

import { PackageRepository } from './repository/package.repository';
import { Types } from 'mongoose';
import { IUser } from '../user/interfaces/user.interface';
import { UserRepository } from '../user/repository/user.repository';
import { IPackageQuery, PackageStatus } from './interface/package.interface';

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
      status: { $in: [PackageStatus.New, PackageStatus.Pending] },
      deliveredBy: null,
    };

    return await this.packageRepository.updateEntityOrFail(
      { ...actualPackageFilter },
      { ...updatePack },
      null,
      'Package ID o Status invalido, solo puede ser "new" o "pending" y no tener ningun repartidor asignado',
    );
  }

  async unassignFromUser(_id: string) {
    return `Unassign package from user. id: ${_id}`;
  }

  async modifyPackage(_id: string, newPackage) {
    return `Package modified. id: ${_id}, changes: ${newPackage}`;
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

  async getPackageHistory(
    user: IUser,
    page?: number,
    limit?: number,
  ): Promise<Package[]> {
    const { _id, name, lastName } = user;

    const deliveredBy = {
      _id,
      name,
      lastName,
    };

    return await this.packageRepository.find(
      { deliveredBy, showHistory: true },
      page,
      limit,
    );
  }

  async deleteFromHistory(_id: Types.ObjectId, user: IUser): Promise<Package> {
    const actualPackage = {
      _id,
      deliveredBy: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
      },
      showHistory: true,
    };

    const update = {
      showHistory: false,
    };

    return await this.packageRepository.updateEntityOrFail(
      {
        ...actualPackage,
      },
      {
        ...update,
      },
    );
  }

  async deletePackage(_id: Types.ObjectId): Promise<void> {
    await this.packageRepository.deleteEntity(_id);
  }

  async getPackage(
    dateFilter: Date,
    page?: number,
    limit?: number,
    status?: PackageStatus,
  ): Promise<Package[]> {
    const packageFilterQuery: IPackageQuery = {
      deliveryDate: { $gte: dateFilter, $lte: dateFilter },
    };
    if (status) {
      packageFilterQuery.status = { $eq: status };
    }
    return await this.packageRepository.find(
      { ...packageFilterQuery },
      page,
      limit,
    );
  }

  async getRecordByDate(
    deliveryDate: Date,
  ): Promise<{ activePackages: number; totalPackages: number }> {
    const packages = await this.packageRepository.aggregate([
      { $match: { deliveryDate } },
      { $group: { _id: '$status', total: { $sum: 1 } } },
    ]);

    const newPackages = packages.find((pack) => pack._id == 'new') || {
      total: 0,
    };
    const pendingPackages = packages.find((pack) => pack._id == 'pending') || {
      total: 0,
    };
    const deliveringPackages = packages.find(
      (pack) => pack._id == 'delivering',
    ) || { total: 0 };
    const failedPackages = packages.find((pack) => pack._id == 'failed') || {
      total: 0,
    };
    const deliveredPackages = packages.find(
      (pack) => pack._id == 'delivered',
    ) || { total: 0 };

    const activePackages =
      newPackages.total +
      pendingPackages.total +
      deliveringPackages.total +
      failedPackages.total;

    const response = {
      activePackages,
      totalPackages: activePackages + deliveredPackages.total,
    };
    return response;
  }
}
