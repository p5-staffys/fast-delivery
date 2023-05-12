import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  UseInterceptors,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthService } from '../../common/modules/firebase/auth.service';
import { UserService } from '../user/user.service';

import { Public } from '../../common/guards/auth.guard';
import { GeneralError } from '../../common/error-handlers/exceptions';

import { CreateAdminDto } from './dtos/create-admin.dto';
import {
  CurrentAdminInterceptor,
  CurrentAdminRequest,
} from './interceptors/current-admin.interceptor';
import { IAdmin } from './interfaces/admin.interface';
import { AdminGuard } from '../../common/guards/admin.guard';
import { UserLogsService } from '../../common/modules/userLogs/userLogs.service';
import { PackageService } from '../package/package.service';
import { CreatePackageDto } from '../package/dto/create-package.dto';
import { Package } from '../package/entities/package.entity';

@ApiTags('Admin')
@UseGuards(AdminGuard)
@Controller()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userLogsService: UserLogsService,
    private readonly packageService: PackageService,
  ) {}

  @ApiOperation({ description: 'Creater un admin.' })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({
    status: 201,
    // type,
  })
  @Public()
  @Post()
  async create(@Body() body: CreateAdminDto): Promise<IAdmin> {
    const { password, email, name, lastName } = body;
    try {
      await this.authService.checkAdminEmail(email);
      await this.adminService.checkAdminEmail(email);
      const newAuth = await this.authService.create(email, password, true);
      const _id = newAuth.uid;
      await this.adminService.checkAdminId(_id);
      const newAdmin = await this.adminService.create({
        email,
        name,
        lastName,
        _id,
      });
      return newAdmin;
    } catch (error: unknown) {
      throw new GeneralError(error, HttpStatus.UNAUTHORIZED);
    }
  }

  @ApiOperation({ description: 'Obtener los datos del admin logueado.' })
  @ApiBearerAuth('idToken')
  @UseInterceptors(CurrentAdminInterceptor)
  @Get()
  async getAdmin(@Req() request: CurrentAdminRequest) {
    try {
      const admin = request.currentAdmin;
      return admin;
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }

  @ApiOperation({ description: 'Autenticar el admin logueado.' })
  @ApiBearerAuth('idToken')
  @Public()
  @Get('authenticate')
  async authenticate(
    @Headers('Authorization') authorization,
  ): Promise<boolean> {
    try {
      const isAdmin = await this.authService.verifyAdmin(authorization);
      return isAdmin;
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }

  @ApiOperation({
    description:
      'Cambia el estado del usuario. Modifica la propiedad "active" y funciona como un "toggle", cambiando de estado de true a false y de false a true',
  })
  @ApiBearerAuth('idToken')
  @ApiParam({ name: '_id', required: true, type: String })
  @Put('status/:_id')
  async changeUserStatus(@Param('_id') _id: string): Promise<boolean> {
    try {
      const updatedUser = await this.userService.changeUserStatus(_id);
      return updatedUser;
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }

  @ApiOperation({ description: 'Obtener los datos de todos los repartidores.' })
  @ApiBearerAuth('idToken')
  @Get('users')
  async getUsers() {
    try {
      const allUsers = await this.userService.getUsers();
      return allUsers;
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }

  @ApiOperation({
    description: 'Obtener los datos de todos los repartidores activos.',
  })
  @ApiBearerAuth('idToken')
  @Get('active_users')
  async getActiveUsers() {
    try {
      const activeUsers = await this.userService.getActiveUsers();
      return activeUsers;
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }

  @ApiOperation({ description: 'Obtener los datos de un usuario.' })
  @ApiBearerAuth('idToken')
  @UseInterceptors(CurrentAdminInterceptor)
  @Get('user/:_id')
  async getUser(@Param('_id') _id: string) {
    try {
      const user = await this.userService.findById(_id);
      return user;
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }

  @ApiOperation({ description: 'Obtener los resgistros por día.' })
  @ApiBearerAuth('idToken')
  @Get('getLogs/:date')
  async getLogs(@Param('date') requestDate: string) {
    try {
      const date = new Date(requestDate);

      const userLogs = await this.userLogsService.getRecordByDate(date);
      const totalUsersCount = await this.userService.countUsers();
      const users = {
        activeUsers: userLogs.activeUsers,
        totalUsersCount,
      };

      const packages = await this.packageService.getRecordByDate(date);

      const response = {
        date,
        users,
        packages,
      };

      return response;
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }

  @ApiBearerAuth('idToken')
  @ApiOperation({
    description: 'Obtener el resgistro de repartidores activos por día.',
  })
  @Get('getUserLogs/:date')
  async getUserLogs(@Param('date') requestDate: string) {
    try {
      const date = new Date(requestDate);

      const userLogs = await this.userLogsService.getRecordByDate(date);
      const totalUsersCount = await this.userService.countUsers();
      const response = {
        date,
        activeUsers: userLogs.activeUsers,
        totalUsersCount,
      };

      return response;
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }

  @ApiOperation({
    description: 'Obtener el resgistro de paquetes entregados por día.',
  })
  @ApiBearerAuth('idToken')
  @Get('getPackageLogs/:date')
  async getPackageLogs(@Param('date') requestDate: string) {
    try {
      const date = new Date(requestDate);
      const packageLogs = await this.packageService.getRecordByDate(date);
      return { date, packageLogs };
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }

  @ApiOperation({ description: 'Crear paquetes.' })
  @ApiBearerAuth('idToken')
  @ApiBody({ type: [CreatePackageDto] })
  @ApiResponse({
    status: 201,
    // type: dto de rta,
  })
  @UseGuards(AdminGuard)
  @UseInterceptors(CurrentAdminInterceptor)
  @Post('package')
  async createPackage(
    @Body() body: CreatePackageDto[],
    @Req() { currentAdmin }: CurrentAdminRequest,
  ): Promise<Package[]> {
    try {
      const createdBy = {
        fullName: `${currentAdmin.name} ${currentAdmin.lastName}`,
        _id: currentAdmin._id,
        email: currentAdmin.email,
      };
      const newPackage = body.map((pack) => {
        return {
          ...pack,
          createdBy,
        };
      });
      const createdPackage = await this.packageService.createMany(newPackage);
      return createdPackage;
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }

  // TERMINAR ESTA RUTA!
  /*
  @Put('package/:_id/assignToUser/')
  @ApiBearerAuth('idToken')
  @ApiOperation({ description: 'EndPoint to assing package to currentUser' })
  @ApiParam({ name: '_id', required: true, type: String })
  @UseInterceptors(CurrentUserInterceptor)
  async assignToUser(
    @Param('_id') _id: Types.ObjectId,
    @Req() { currentUser }: CurrentUserRequest,
  ): Promise<Package> {
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
  }*/
}
