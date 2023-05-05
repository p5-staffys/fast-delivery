import { Get, Param, Put, Query, Delete, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { PackageService } from './package.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Types } from 'mongoose';
import { QueryPaginationDto } from '../../common/dto/pagination.dto';
import { ValidateMongoId } from '../../common/pipe/validate-mongoid.pipe';

import { Package } from './entities/package.entity';

import { AdminGuard } from '../../common/guards/admin.guard';
import { QueryPaginationWithDateAndStatusDto } from './dto/pagination-status-date.dto';

@ApiTags('Package')
@Controller()
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @ApiOperation({
    description: 'Package are wating for taken but dont have any delivery ',
  })
  @ApiBearerAuth('idToken')
  @ApiParam({ name: 'date', required: true, type: String })
  @Get('pending/:date')
  async getPendingPackageByClient(
    @Query() queryPaginateDto: QueryPaginationDto,
    @Param('date') date: string,
  ): Promise<Package[]> {
    const { limit, page } = queryPaginateDto;
    const deliveryDate = new Date(date);
    return await this.packageService.getPendingPackageByClient(
      deliveryDate,
      limit,
      page,
    );
  }

  @Put(':_id/delivered')
  @ApiBearerAuth('idToken')
  @ApiParam({ name: '_id', required: true, type: String })
  async delivered(
    @Param('_id', ValidateMongoId) _id: Types.ObjectId,
  ): Promise<Package> {
    return await this.packageService.delivered(_id);
  }

  @Get(':_id')
  @ApiBearerAuth('idToken')
  @ApiParam({ name: '_id', required: true, type: String })
  @ApiOperation({ description: 'Get Package by id' })
  async getById(
    @Param('_id', ValidateMongoId) _id: Types.ObjectId,
  ): Promise<Package> {
    return await this.packageService.getById(_id);
  }

  @ApiOperation({ description: 'Delete package by admin' })
  @ApiBearerAuth('idToken')
  @ApiParam({ name: '_id', required: true, type: String })
  @UseGuards(AdminGuard)
  @Delete(':_id')
  async deletePackage(@Param('_id', ValidateMongoId) _id): Promise<string> {
    await this.packageService.deletePackage(_id);
    return 'Package deleted';
  }

  @ApiOperation({ description: 'Get Package by date' })
  @ApiBearerAuth('idToken')
  @UseGuards(AdminGuard)
  @Get()
  async getPackage(
    @Query() queryParams: QueryPaginationWithDateAndStatusDto,
  ): Promise<Package[]> {
    const { limit, page, status, date } = queryParams;

    return await this.packageService.getPackage(date, page, limit, status);
  }
}
