import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, PipelineStage } from 'mongoose';
import { Model } from '../../../common/database/softdelete/softDelete.interface';
import { EntityRepository } from '../../../common/database/repository/db.repository';
import { Package, PackageDocument } from '../entities/package.entity';
import { PackageStatus } from '../interface/package.interface';

@Injectable()
export class PackageRepository extends EntityRepository<PackageDocument> {
  constructor(
    @InjectModel(Package.name)
    private readonly packageModel: Model<PackageDocument>,
  ) {
    super(packageModel);
  }

  async findPendingPackages(page?: number, limit?: number): Promise<Package[]> {
    return await this.find(
      {
        status: PackageStatus.Pending,
        deliveredBy: null,
      },
      page,
      limit,
    );
  }

  async getPackageById(_id: Types.ObjectId) {
    return await this.findById(_id);
  }

  async findPendingPackageById(_id: Types.ObjectId): Promise<Package> {
    const packages = await this.packageModel.findOne({
      $and: [
        { _id },
        {
          status: PackageStatus.Pending,
        },
        {
          deliveredBy: { $eq: null },
        },
      ],
    });

    if (!packages)
      throw new BadRequestException(
        'El paquete no se encuentra o ya tiene un repartidor asignado.',
      );

    return packages;
  }

  async aggregate(filter: PipelineStage[]) {
    return this.packageModel.aggregate(filter);
  }
}
