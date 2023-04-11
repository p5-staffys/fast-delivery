import { Response, Request } from 'express';
import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { AdminAuthService } from '../auth/admin-auth.service';

import { ReponseUserDto } from './dto/response-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUserInterceptor } from '../auth/middleware/current-user.interceptor';
import { CurrentUserRequest } from '../auth/middleware/current-user.interceptor';

import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { Public } from '../auth/middleware/auth.guard';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly adminAuthService: AdminAuthService,
  ) {}

  @Public()
  @Post()
  async create(@Body() newUser: CreateUserDto): Promise<ReponseUserDto> {
    const { password, email, name, lastName } = newUser;
    await this.userService.checkUserEmail(email);
    const _id = (await this.authService.create(email, password)).user.uid;
    return this.userService.create({ email, name, lastName, _id });
  }

  @Delete()
  async remove(): Promise<string> {
    const auth = await this.authService.getCurrentUser();
    await this.authService.delete(auth);
    await this.userService.remove(auth.uid);
    return `User ${auth.uid} deleted`;
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
    const userCredentials = await this.authService.signIn(email, password);
    const token = await userCredentials.user.getIdToken();
    response.cookie('idToken', token);
    const user = await this.userService.findByEmail(email);

    return { user, token };
  }

  @Post('/signOut')
  async signOut(): Promise<string> {
    const user = await this.authService.getCurrentUser();
    await this.authService.signOut();
    return `El usuario ${user.uid} se deslogueó`;
  }

  @UseInterceptors(CurrentUserInterceptor)
  @Get()
  async getCurrent(
    @Req() request: CurrentUserRequest,
  ): Promise<ReponseUserDto> {
    const currentUser = request.currentUser;
    return currentUser;
  }

  @Patch()
  async update(
    @Body() updateData: UpdateUserDto,
    @Req() request: Request,
  ): Promise<ReponseUserDto | unknown> {
    const idToken = request.cookies['idToken'];
    const _id = (await this.adminAuthService.authenticate(idToken)).uid;
    const user = await this.userService.update(_id, updateData);
    return user;
  }

  @Post('/addForm')
  async addForm(@Body() form: JSON, @Req() request: Request): Promise<unknown> {
    const idToken = request.cookies['idToken'];
    const _id = (await this.adminAuthService.authenticate(idToken)).uid;
    return this.userService.addForm(_id, form);
  }
}
