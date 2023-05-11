import { Injectable } from '@nestjs/common';
import { Document } from 'mongoose';

import { CreatePackageDto } from './dto/create-package.dto';
import { Package } from './entities/package.entity';

import { PackageRepository } from './repository/package.repository';
import { Types } from 'mongoose';
import { IUser, IUserRef } from '../user/interfaces/user.interface';
import { User } from '../user/entities/user.entity';
import { IPackageQuery, PackageStatus } from './interface/package.interface';

@Injectable()
export class PackageService {
  constructor(private readonly packageRepository: PackageRepository) {}

  async create(newPackage: CreatePackageDto): Promise<Package> {
    const pack = await this.packageRepository.createEntity(newPackage);
    return pack;
  }

  async createMany(newPackages: CreatePackageDto[]) {
    const packages = await this.packageRepository.createEntities(newPackages);
    return packages;
  }

  async getPendingPackage(page?: number, limit?: number): Promise<Package[]> {
    return await this.packageRepository.findPendingPackages(page, limit);
  }

  async getPendingPackageByClient(
    deliveryDate: Date,
    limit = 3,
    page = 1,
  ): Promise<Package[]> {
    const packages = await this.packageRepository.aggregate([
      {
        $match: {
          status: PackageStatus.Pending,
          deliveredBy: null,
          deliveryDate,
        },
      },
      {
        $group: { _id: '$client', packages: { $addToSet: '$$ROOT' } },
      },
      { $skip: limit * (page - 1) },
      { $limit: limit },
    ]);
    return packages;
  }

  async getById(_id: Types.ObjectId) {
    return await this.packageRepository.getPackageById(_id);
  }

  async assignToUser(_id: Types.ObjectId, deliveredBy: IUserRef) {
    const updatePack = {
      deliveredBy,
      status: PackageStatus.Delivering,
    };

    const actualPackageFilter = {
      _id,
      status: PackageStatus.Pending,
      deliveredBy: null,
    };

    return await this.packageRepository.updateEntityOrFail(
      { ...actualPackageFilter },
      { ...updatePack },
      null,
      'Package ID o Status invalido, solo puede ser "new" o "pending" y no tener ningun repartidor asignado',
    );
  }

  async assignPackagesToUser(
    packages: Types.ObjectId[],
    currentUser: Document<unknown, User> &
      Omit<
        User &
          Required<{
            _id: string;
          }>,
        never
      >,
  ) {
    const deliveredBy: IUserRef = {
      fullName: `${currentUser.name} ${currentUser.lastName}`,
      _id: currentUser._id,
      email: currentUser.email,
      avatarURL: currentUser.avatarURL,
    };
    const updatedPackages = [];
    const missingPackages = [];
    for (let i = 0; i < packages.length; i++) {
      const pack = await this.packageRepository.findById(packages[i]);
      if (!pack) {
        missingPackages.push(`El paquete ${packages[i]} no existe.`);
      } else {
        if (pack.deliveredBy) {
          missingPackages.push(`El paquete  ${packages[i]}  ya fue asignado.`);
        } else {
          pack.deliveredBy = deliveredBy;
          pack.status = PackageStatus.Delivering;
          pack.save();
          updatedPackages.push(pack);
        }
      }
    }

    return { updatedPackages, missingPackages };
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

  async deliverPackages(packages: Types.ObjectId[]): Promise<Package[]> {
    const updatedPacakges: Package[] = [];
    for (let i = 0; i < packages.length; i++) {
      const pack = await this.packageRepository.findById(packages[i]);
      if (!pack) throw `El paquete ${packages[i]} no existe.`;
      pack.status = PackageStatus.Delivered;
      await pack.save();
      updatedPacakges.push(pack);
    }
    return updatedPacakges;
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

  async unassignFromUser(_id: Types.ObjectId) {
    const pack = await this.packageRepository.findById(_id);
    if (pack && pack.status == PackageStatus.Delivered) return;
    pack.status = PackageStatus.Pending;
    pack.deliveredBy = null;
    await pack.save();
    return pack;
  }
}
