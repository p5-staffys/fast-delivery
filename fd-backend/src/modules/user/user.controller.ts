import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Req,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';

import { UserService } from './user.service';

import { AdminAuthService } from '../auth/admin-auth.service';

import { ReponseUserDto } from './dto/response-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUserInterceptor } from '../auth/middleware/current-user.interceptor';
import { CurrentUserRequest } from '../auth/middleware/current-user.interceptor';

import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/middleware/auth.guard';
import { FormAplyDto } from '../../common/modules/formApply/dto/form-apply.dto';
import { User } from './entities/user.entity';
import { GeneralError } from '../../common/error-handlers/exceptions';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly adminAuthService: AdminAuthService,
  ) {}

  @Public()
  @Post()
  async create(@Body() newUser: CreateUserDto): Promise<ReponseUserDto> {
    const { password, email, name, lastName } = newUser;
    await this.userService.checkUserEmail(email);
    try {
      const _id = (await this.adminAuthService.create(email, password, false))
        .uid;
      return this.userService.create({ email, name, lastName, _id });
    } catch (error: unknown) {
      throw new GeneralError(error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseInterceptors(CurrentUserInterceptor)
  @Get()
  async getCurrent(
    @Req() request: CurrentUserRequest,
  ): Promise<ReponseUserDto> {
    const currentUser = request.currentUser;
    return currentUser;
  }

  @Get('authenticate')
  async authenticate(): Promise<boolean> {
    return true;
  }

  @UseInterceptors(CurrentUserInterceptor)
  @Delete()
  async delete(@Req() request: CurrentUserRequest): Promise<string> {
    try {
      const _id = request.currentUser._id;
      await this.userService.remove(_id);
      return `User deleted`;
    } catch {
      throw new GeneralError('No se pudo eliminar el usuario');
    }
  }

  @UseInterceptors(CurrentUserInterceptor)
  @Patch()
  async update(
    @Body() updateData: UpdateUserDto,
    @Req() request: CurrentUserRequest,
  ): Promise<ReponseUserDto | unknown> {
    try {
      const _id = request.currentUser._id;
      const user = await this.userService.update(_id, updateData);
      return user;
    } catch {
      throw new GeneralError('No se pudo actualizar el usuario');
    }
  }

  @Post('/addForm')
  @UseInterceptors(CurrentUserInterceptor)
  @ApiBody({ type: FormAplyDto })
  async addForm(
    @Body() form: FormAplyDto,
    @Req() { currentUser }: CurrentUserRequest,
  ): Promise<User> {
    return await this.userService.addForm(currentUser._id, form);
  }
}
