import { Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { PackageService } from './package.service';
import {
  CreatePackageDto,
  ResponseCreatePackageDto,
} from './dto/create-package.dto';

@Controller()
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  async create(
    @Body() newPackage: CreatePackageDto,
  ): Promise<ResponseCreatePackageDto> {
    return this.packageService.create(newPackage);
  }

  @Get(':_id')
  async getById(@Param('_id') _id) {
    return this.packageService.getById(_id);
  }

  @Put(':_id/assign_to/:user_id')
  async assignToUser(@Param('_id') _id, @Param('user_id') user_id) {
    return this.packageService.assignToUser(_id, user_id);
  }

  @Put(':_id/unassign')
  async unassignFromUser(@Param('_id') _id) {
    return this.packageService.unassignFromUser(_id);
  }

  @Put('_id')
  async modifyPackage(@Param('_id') _id, @Body() newPackage) {
    return this.packageService.modifyPackage(_id, newPackage);
  }

  @Delete(':_id')
  async delete(@Param('_id') _id) {
    return this.packageService.delete(_id);
  }

  @Put(':_id/delivered')
  async delivered(@Param('_id') _id) {
    return this.packageService.delivered(_id);
  }
}
