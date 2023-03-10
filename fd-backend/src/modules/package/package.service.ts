import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreatePackageDto,
  ResponseCreatePackageDto,
} from './dto/create.package.dto';

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
}
