import { Post, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { PackageService } from './package.service';
import {
  CreatePackageDto,
  ResponseCreatePackageDto,
} from './dto/create.package.dto';

@Controller()
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  async create(
    @Body() newPackage: CreatePackageDto,
  ): Promise<ResponseCreatePackageDto> {
    return this.packageService.create(newPackage);
  }
}
