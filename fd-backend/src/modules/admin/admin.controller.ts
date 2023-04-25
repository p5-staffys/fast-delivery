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

import { AuthService } from '../../common/firebase/auth.service';
import { Public } from '../../common/guards/auth.guard';
import { GeneralError } from '../../common/error-handlers/exceptions';

import { CreateAdminDto } from './dtos/create-admin.dto';
import {
  CurrentAdminInterceptor,
  CurrentAdminRequest,
} from './interceptors/current-admin.interceptor';

@ApiTags('Admin')
@Controller()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post()
  @ApiOperation({ description: 'Create admin' })
  async create(@Body() body: CreateAdminDto) {
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
