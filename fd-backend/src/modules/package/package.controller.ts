import {
  Post,
  Body,
  Get,
  Param,
  Put,
  Query,
  UseInterceptors,
  Req,
  Delete,
  UseGuards,
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
} from '../user/interceptors/current-user.interceptor';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { QueryPaginationWithDateAndStatusDto } from './dto/pagination-status-date.dto';

@ApiTags('Package')
@Controller()
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  @ApiBearerAuth('idToken')
  @ApiResponse({
    status: 201,
    // type: dto de rta,
  })
  @ApiBody({ type: CreatePackageDto })
  @ApiOperation({ description: 'Create package' })
  @UseGuards(AdminGuard)
  async create(@Body() newPackage: CreatePackageDto): Promise<Package> {
    try {
      const createdPackage = await this.packageService.create(newPackage);
      return createdPackage;
    } catch {
      throw new GeneralError('No se pudo crear el paquete');
    }
  }

  @Get('pending')
  @ApiBearerAuth('idToken')
  @ApiOperation({
    description: 'Package are wating for taken but dont have any delivery ',
  })
  async getPendingPackage(
    @Query() queryPaginateDto: QueryPaginationDto,
  ): Promise<Package[]> {
    const { limit, page } = queryPaginateDto;
    return await this.packageService.getPendingPackage(page, limit);
  }

  @Put(':_id/assign/')
  @ApiBearerAuth('idToken')
  @ApiOperation({ description: 'EndPoint to assing package to currentUser' })
  @ApiParam({ name: '_id', required: true, type: String })
  @UseInterceptors(CurrentUserInterceptor)
  async assignToUser(
    @Param('_id', ValidateMongoId) _id: Types.ObjectId,
    @Req() { currentUser }: CurrentUserRequest,
  ): Promise<Package> {
    return await this.packageService.assignToUser(_id, currentUser);
  }

  @ApiOperation({ description: 'Get Package History by currentUser' })
  @ApiBearerAuth('idToken')
  @Get('/history')
  @UseInterceptors(CurrentUserInterceptor)
  async getPackageHistory(
    @Query() queryPaginateDto: QueryPaginationDto,
    @Req() { currentUser }: CurrentUserRequest,
  ): Promise<Package[]> {
    const { page, limit } = queryPaginateDto;
    return await this.packageService.getPackageHistory(
      currentUser,
      page,
      limit,
    );
  }
  // @Put(':_id/unassign')
  // async unassignFromUser(@Param('_id') _id) {
  //   return this.packageService.unassignFromUser(_id);
  // }

  // @Put('_id')
  // async modifyPackage(@Param('_id') _id, @Body() newPackage) {
  //   return this.packageService.modifyPackage(_id, newPackage);
  // }

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

  //To see What happend if package is delivering
  @Delete(':_id/history')
  @ApiBearerAuth('idToken')
  @ApiParam({ name: '_id', required: true, type: String })
  @ApiOperation({ description: 'Delete package from history' })
  @UseInterceptors(CurrentUserInterceptor)
  async deleteFromHistory(
    @Param('_id', ValidateMongoId) _id,
    @Req() { currentUser }: CurrentUserRequest,
  ): Promise<Package> {
    return this.packageService.deleteFromHistory(_id, currentUser);
  }

  @Delete(':_id')
  @ApiBearerAuth('idToken')
  @ApiParam({ name: '_id', required: true, type: String })
  @ApiOperation({ description: 'Delete package by admin' })
  @UseGuards(AdminGuard)
  async deletePackage(@Param('_id', ValidateMongoId) _id): Promise<string> {
    await this.packageService.deletePackage(_id);
    return 'Package deleted';
  }

  @Get()
  @ApiBearerAuth('idToken')
  @ApiOperation({ description: 'Get Package by date' })
  @UseGuards(AdminGuard)
  async getPackage(
    @Query() queryParams: QueryPaginationWithDateAndStatusDto,
  ): Promise<Package[]> {
    const { limit, page, status, date } = queryParams;

    return await this.packageService.getPackage(date, page, limit, status);
  }
}
