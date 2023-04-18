import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminAuthService } from '../auth/admin-auth.service';
import { Public } from '../auth/middleware/auth.guard';
import { AdminGuard } from '../auth/middleware/admin.guard';
import { IAdmin } from './interface/admin.interface';
import { GeneralError } from '../../common/error-handlers/exceptions';

@ApiTags('Admin')
@Controller()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly adminAuthService: AdminAuthService,
  ) {}

  @Public()
  @Post()
  async create(@Body() newAdmin: IAdmin) {
    try {
      const { email, password } = newAdmin;
      const newAdminAuth = await this.adminAuthService.create(
        email,
        password,
        true,
      );
      const _id = newAdminAuth.uid;
      const newAdminUser = await this.adminService.create({ ...newAdmin, _id });
      return newAdminUser;
    } catch (error: unknown) {
      throw new GeneralError('No se pudo crear el usuario');
    }
  }

  @UseGuards(AdminGuard)
  @Get('users')
  async getUsers() {
    return 'hola';
  }

  @UseGuards(AdminGuard)
  @Get('active_users')
  async getActiveUsers() {
    return this.adminService.getActiveUsers();
  }

  @UseGuards(AdminGuard)
  @Get('packages')
  async getPackages() {
    return this.adminService.getPackages();
  }

  @UseGuards(AdminGuard)
  @Get('active_packages')
  async getActivePackages() {
    return this.adminService.getActivePackages();
  }

  @UseGuards(AdminGuard)
  @Put('status/:_id')
  async changeUserStatus(@Param('_id') _id) {
    return this.adminService.changeUserStatus(_id);
  }
}
