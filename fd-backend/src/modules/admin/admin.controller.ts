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
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { AdminAuthService } from '../auth/admin-auth.service';
import { Public } from '../auth/middleware/auth.guard';
import { GeneralError } from '../../common/error-handlers/exceptions';

import { CreateAdminDto } from './dto/create-admin.dto';
import {
  CurrentAdminInterceptor,
  CurrentAdminRequest,
} from '../auth/middleware/current-admin.interceptor';

@ApiTags('Admin')
@Controller()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly adminAuthService: AdminAuthService,
  ) {}

  @Public()
  @Post()
  @ApiOperation({ description: 'Create admin' })
  async create(@Body() newAdmin: CreateAdminDto) {
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
      throw new GeneralError(error, HttpStatus.UNAUTHORIZED);
    }
  }

  @UseInterceptors(CurrentAdminInterceptor)
  @Get()
  async getAdmin(@Req() request: CurrentAdminRequest) {
    const user = request.currentUser;
    return user;
  }

  @Get('authenticate')
  async authenticate(): Promise<boolean> {
    return true;
  }

  @Get('users')
  async getUsers() {
    return 'hola';
  }

  @Get('active_users')
  async getActiveUsers() {
    return this.adminService.getActiveUsers();
  }

  @Get('packages')
  async getPackages() {
    return this.adminService.getPackages();
  }

  @Get('active_packages')
  async getActivePackages() {
    return this.adminService.getActivePackages();
  }

  @Put('status/:_id')
  async changeUserStatus(@Param('_id') _id) {
    return this.adminService.changeUserStatus(_id);
  }
}
