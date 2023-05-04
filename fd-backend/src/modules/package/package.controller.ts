import {
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
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Types } from 'mongoose';
import { QueryPaginationDto } from '../../common/dto/pagination.dto';
import { ValidateMongoId } from '../../common/pipe/validate-mongoid.pipe';

import { Package } from './entities/package.entity';
import {
  CurrentUserInterceptor,
  CurrentUserRequest,
} from '../user/interceptors/current-user.interceptor';
import { AdminGuard } from '../../common/guards/admin.guard';
import { QueryPaginationWithDateAndStatusDto } from './dto/pagination-status-date.dto';
import { IUserRef } from '../user/interfaces/user.interface';
import { IPackageRef } from './interface/package.interface';
import { UserService } from '../user/user.service';
import { IClientRef } from 'src/common/modules/client/interface/client.interface';

@ApiTags('Package')
@Controller()
export class PackageController {
  constructor(
    private readonly packageService: PackageService,
    private readonly userService: UserService,
  ) {}

  // Funcionalidad movida al modulo de admin
  /*@Post()
  @ApiBearerAuth('idToken')
  @ApiResponse({
    status: 201,
    // type: dto de rta,
  })
  @ApiBody({ type: CreatePackageDto })
  @ApiOperation({ description: 'Create package' })
  @UseGuards(AdminGuard)
  @UseInterceptors(CurrentAdminInterceptor)
  async create(
    @Body() body: CreatePackageDto,
    @Req() { currentAdmin }: CurrentAdminRequest,
  ): Promise<Package> {
    try {
      const createdBy = {
        fullName: `${currentAdmin.name} ${currentAdmin.lastName}`,
        _id: currentAdmin._id,
        email: currentAdmin.email,
      };
      const newPackage = { ...body, createdBy };
      const createdPackage = await this.packageService.create(newPackage);
      return createdPackage;
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }*/

  /*@Get('pending')
  @ApiBearerAuth('idToken')
  @ApiOperation({
    description: 'Package are wating for taken but dont have any delivery ',
  })
  async getPendingPackage(
    @Query() queryPaginateDto: QueryPaginationDto,
  ): Promise<Package[]> {
    const { limit, page } = queryPaginateDto;
    return await this.packageService.getPendingPackage(page, limit);
  }*/

  @Get('pending/:date')
  @ApiBearerAuth('idToken')
  @ApiOperation({
    description: 'Package are wating for taken but dont have any delivery ',
  })
  @ApiParam({ name: 'date', required: true, type: String })
  async getPendingPackageByClient(
    @Query() queryPaginateDto: QueryPaginationDto,
    @Param('date') date: string,
  ): Promise<Package[]> {
    //const { limit, page } = queryPaginateDto;
    const deliveryDate = new Date(date);
    return await this.packageService.getPendingPackageByClient(deliveryDate);
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
    /*const form = await this.userRepository.foundUserAndValidateForm(user._id);
    if (!form)
      throw new BadRequestException(
        'No hiciste tu formulario de hoy, tenes que hacerlo para poder continuar',
      );

    const { bebidasAlcoholicas, medicamentosPsicoactivos, problemaEmocional } =
      form.forms[form.forms.length - 1];

    if (bebidasAlcoholicas || medicamentosPsicoactivos || problemaEmocional)
      throw new BadRequestException(
        'No cumplis los requisitos minimos para trabajar durante el dia de hoy, proba nuevamente en 24hs',
      );*/
    const deliveredBy: IUserRef = {
      fullName: `${currentUser.name} ${currentUser.lastName}`,
      _id: currentUser._id,
      email: currentUser.email,
    };
    const updatePackage = await this.packageService.assignToUser(
      _id,
      deliveredBy,
    );

    const client: IClientRef = {
      fullName: updatePackage.client.fullName,
      address: `${updatePackage.client.address.street} ${updatePackage.client.address.number}, ${updatePackage.client.address.city}, ${updatePackage.client.address.state}, ${updatePackage.client.address.country}`,
    };
    const packageRef: IPackageRef = {
      _id: updatePackage._id,
      client,
      deliveryDate: updatePackage.deliveryDate,
      status: updatePackage.status,
    };

    await this.userService.assignPackage(currentUser, packageRef);
    return updatePackage;
  }

  // Funcionalidad obsoleta
  /*  @ApiOperation({ description: 'Get Package History by currentUser' })
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
  }*/
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
  //This is not what the "delete" button should do
  /*@Delete(':_id/history')
  @ApiBearerAuth('idToken')
  @ApiParam({ name: '_id', required: true, type: String })
  @ApiOperation({ description: 'Delete package from history' })
  @UseInterceptors(CurrentUserInterceptor)
  async deleteFromHistory(
    @Param('_id', ValidateMongoId) _id,
    @Req() { currentUser }: CurrentUserRequest,
  ): Promise<Package> {
    return this.packageService.deleteFromHistory(_id, currentUser);
  }*/

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
