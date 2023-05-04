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

  @Public()
  @Post()
  @ApiOperation({ description: 'Create admin' })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({
    status: 201,
    // type,
  })
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

  @ApiBearerAuth('idToken')
  @ApiOperation({ description: 'Get current admin' })
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

  @ApiBearerAuth('idToken')
  @ApiOperation({ description: 'Authenticate current admin' })
  @Public()
  @Get('authenticate')
  async authenticate(
    @Headers('Authorization') authorization,
  ): Promise<boolean> {
    try {
      await this.authService.verifyAdmin(authorization);
      return true;
    } catch (error: unknown) {
      return false;
    }
  }

  @ApiBearerAuth('idToken')
  @ApiOperation({
    description:
      'Cambia el estado del usuario. Modifica la propiedad "active" y funciona como un "toggle", cambiando de estado de true a false y de false a true',
  })
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

  @ApiBearerAuth('idToken')
  @ApiOperation({ description: 'Get all users' })
  @Get('users')
  async getUsers() {
    try {
      const allUsers = await this.userService.getUsers();
      return allUsers;
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }

  @ApiBearerAuth('idToken')
  @ApiOperation({ description: 'Get all active users' })
  @Get('active_users')
  async getActiveUsers() {
    try {
      const activeUsers = await this.userService.getActiveUsers();
      return activeUsers;
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }

  @ApiBearerAuth('idToken')
  @ApiOperation({ description: 'Get users logs of a day' })
  @Get('getLogs/:date')
  async getLogs(@Param('date') requestDate: string) {
    try {
      const date = new Date(requestDate);

      const userLogs = await this.userLogsService.getRecordByDate(date);
      const totalUsersCount = await this.userService.countUsers();
      const users = {
        activeUsers: userLogs.activeUsers.length,
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
  @ApiOperation({ description: 'Get users logs of a day' })
  @Get('getUserLogs/:date')
  async getUserLogs(@Param('date') requestDate: string) {
    try {
      const date = new Date(requestDate);

      const userLogs = await this.userLogsService.getRecordByDate(date);
      const totalUsersCount = await this.userService.countUsers();
      const response = {
        date,
        activeUsers: userLogs.activeUsers.length,
        totalUsersCount,
      };

      return response;
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }

  @ApiBearerAuth('idToken')
  @ApiOperation({ description: 'Get packages logs of a day' })
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
}
