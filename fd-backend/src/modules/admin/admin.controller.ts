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
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthService } from '../../common/firebase/auth.service';
import { UserService } from '../user/user.service';

import { Public } from '../../common/guards/auth.guard';
import { GeneralError } from '../../common/error-handlers/exceptions';

import { CreateAdminDto } from './dtos/create-admin.dto';
import {
  CurrentAdminInterceptor,
  CurrentAdminRequest,
} from './interceptors/current-admin.interceptor';
import { IAdmin } from './interfaces/admin.interface';

@ApiTags('Admin')
@Controller()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
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
    const admin = request.currentAdmin;
    return admin;
  }

  @ApiBearerAuth('idToken')
  @ApiOperation({ description: 'Authenticate current admin' })
  @Get('authenticate')
  async authenticate(): Promise<boolean> {
    return true;
  }

  @ApiBearerAuth('idToken')
  @ApiParam({ name: '_id', required: true, type: String })
  @Put('status/:_id')
  async changeUserStatus(@Param('_id') _id: string): Promise<boolean> {
    return this.userService.changeUserStatus(_id);
  }

  @ApiBearerAuth('idToken')
  @ApiOperation({ description: 'Get all users' })
  @Get('users')
  async getUsers() {
    return this.userService.getUsers();
  }

  @ApiBearerAuth('idToken')
  @ApiOperation({ description: 'Get all active users' })
  @Get('active_users')
  async getActiveUsers() {
    return this.userService.getActiveUsers();
  }

  @Get('packages')
  async getPackages() {
    return this.adminService.getPackages();
  }

  @Get('active_packages')
  async getActivePackages() {
    return this.adminService.getActivePackages();
  }
}
