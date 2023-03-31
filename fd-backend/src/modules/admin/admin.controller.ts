import { Controller, Get, Param, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async getUsers() {
    return this.adminService.getUsers();
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
