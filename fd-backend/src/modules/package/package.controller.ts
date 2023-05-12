import { Get, Param, Query, UseGuards } from '@nestjs/common';
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
    description:
      'Devuelve los paquetes que están esperando para ser enviados por cliente.',
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

  @ApiOperation({ description: 'Devuelve un paquete.' })
  @ApiBearerAuth('idToken')
  @ApiParam({ name: '_id', required: true, type: String })
  @Get(':_id')
  async getById(
    @Param('_id', ValidateMongoId) _id: Types.ObjectId,
  ): Promise<Package> {
    return await this.packageService.getById(_id);
  }

  @ApiOperation({ description: 'Devuelve los paquetes por fecha' })
  @ApiBearerAuth('idToken')
  @UseGuards(AdminGuard)
  @Get()
  async getPackage(
    @Query() queryParams: QueryPaginationWithDateAndStatusDto,
  ): Promise<Package[]> {
    const { limit, page, status, date } = queryParams;

    return await this.packageService.getPackage(date, page, limit, status);
  }

  /*
  @ApiOperation({ description: 'Marca un paquete como enviado.' })
  @ApiBearerAuth('idToken')
  @ApiParam({ name: '_id', required: true, type: String })
  @Put(':_id/delivered')
  async delivered(
    @Param('_id', ValidateMongoId) _id: Types.ObjectId,
  ): Promise<Package> {
    return await this.packageService.delivered(_id);
  }
  */

  // Funcionalidad movida a Admin controller
  /*
  @ApiOperation({ description: 'Borra un paquete.' })
  @ApiBearerAuth('idToken')
  @ApiParam({ name: '_id', required: true, type: String })
  @UseGuards(AdminGuard)
  @Delete(':package_id')
  async deletePackage(
    @Param('package_id', ValidateMongoId) package_id,
  ): Promise<string> {
    await this.packageService.deletePackage(package_id);
    return 'Package deleted';
  }
  */
}
