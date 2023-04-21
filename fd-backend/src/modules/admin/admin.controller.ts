import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';

import { AdminAuthService } from '../auth/admin-auth.service';
import { Public } from '../auth/middleware/auth.guard';
import { AdminGuard } from '../auth/middleware/admin.guard';
import { IAdmin } from './interface/admin.interface';
import { GeneralError } from '../../common/error-handlers/exceptions';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { ReponseUserDto } from '../user/dto/response-user.dto';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@ApiTags('Admin')
@Controller()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly adminAuthService: AdminAuthService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('/createUser')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ description: 'Just log in ' })
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
      throw new GeneralError(error, HttpStatus.UNAUTHORIZED);
    }
  }

  @Public()
  @Post('/signIn')
  @ApiBody({ type: CreateAuthDto })
  @ApiOperation({ description: 'Just log in ' })
  async signIn(
    @Body() singInDto: CreateAuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ReponseUserDto | unknown> {
    const { email, password } = singInDto;
    try {
      const userCredentials = await this.authService.signIn(email, password);
      const token = await userCredentials.user.getIdToken();
      const admin = await this.adminAuthService.verifyAdmin(token);
      if (!admin) throw new GeneralError('El usuario no es Admin');
      const _id = userCredentials.user.uid;
      const user = await this.adminService.findById(_id);
      response.cookie('idToken', token, { sameSite: 'none', secure: true });
      return { user, token };
    } catch (error: unknown) {
      throw new GeneralError(error, HttpStatus.UNAUTHORIZED);
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
