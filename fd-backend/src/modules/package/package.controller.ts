import {
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { PackageService } from './package.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Types } from 'mongoose';
import { CreatePackageDto } from './dto/create-package.dto';
import { QueryPaginationDto } from '../../common/dto/pagination.dto';
import { ValidateMongoId } from '../../common/pipe/validate-mongoid.pipe';
import { GeneralError } from '../../common/error-handlers/exceptions';

import { Package } from './entities/package.entity';
import {
  CurrentUserInterceptor,
  CurrentUserRequest,
} from '../auth/middleware/current-user.interceptor';

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
    try {
      const createdPackage = await this.packageService.create(newPackage);
      return createdPackage;
    } catch {
      throw new GeneralError('No se pudo crear el paquete');
    }
  }

  //NEW QUE NO TENGA REPARTIDOR

  @Get()
  @ApiOperation({
    description: 'Package are wating for taken but dont have any delivery ',
  })
  async getPendingPackage(
    @Query() queryPaginateDto: QueryPaginationDto,
  ): Promise<Package[]> {
    try {
      const { limit, page } = queryPaginateDto;
      const pendingPackages = await this.packageService.getPendingPackage(
        page,
        limit,
      );
      return pendingPackages;
    } catch {
      throw new GeneralError('No se pudo acceder a los paquetes');
    }
  }

  @Get(':_id')
  @ApiParam({ name: '_id', required: true, type: String })
  @ApiOperation({ description: 'Get Package by id' })
  async getById(@Param('_id', ValidateMongoId) _id): Promise<Package> {
    try {
      const pack = await this.packageService.getById(_id);
      return pack;
    } catch {
      throw new GeneralError('No se pudo acceder al paquete');
    }
  }

  @Put(':_id/assign/')
  @ApiBearerAuth()
  @ApiParam({ name: '_id', required: true, type: String })
  @UseInterceptors(CurrentUserInterceptor)
  async assignToUser(
    @Param('_id', ValidateMongoId) _id: Types.ObjectId,
    @Req() { currentUser }: CurrentUserRequest,
  ): Promise<Package> {
    try {
      const assignedPackage = await this.packageService.assignToUser(
        _id,
        currentUser,
      );
      return assignedPackage;
    } catch {
      throw new GeneralError('No se pudo asignar el paquete al usuario');
    }
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
