import { Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Package } from './entities/package.entity';
import { QueryPaginationDto } from '../../common/dto/pagination.dto';
import { ValidateMongoId } from '../../common/pipe/validate-mongoid.pipe';

@ApiTags('Package')
@Controller()
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    // type: dto de rta,
  })
  @ApiBody({ type: CreatePackageDto })
  @ApiOperation({ description: 'Create package' })
  async create(@Body() newPackage: CreatePackageDto): Promise<Package> {
    return await this.packageService.create(newPackage);
  }

  //NEW QUE NO TENGA REPARTIDOR

  @Get()
  @ApiOperation({
    description: 'Package are wating for taken but dont have any delivery ',
  })
  async getPendingPackage(
    @Query() queryPaginateDto: QueryPaginationDto,
  ): Promise<Package[]> {
    const { limit, page } = queryPaginateDto;
    return await this.packageService.getPendingPackage(page, limit);
  }

  @Get(':_id')
  @ApiParam({ name: '_id', required: true, type: String })
  @ApiOperation({ description: 'Get Package by id' })
  async getById(@Param('_id', ValidateMongoId) _id) {
    return this.packageService.getById(_id);
  }

  //TODO: Change userid param to current user interceptor, and with this only current user can assignToPackage
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
