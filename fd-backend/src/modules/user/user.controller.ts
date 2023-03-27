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
} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { AdminAuthService } from '../auth/admin-auth.service';

import { ReponseUserDto } from './dto/response-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly adminAuthService: AdminAuthService,
  ) {}

  @Post()
  async create(@Body() newUser: CreateUserDto): Promise<ReponseUserDto> {
    const { password, email, name, lastName } = newUser;
    const userCredentials = await this.authService.create(email, password);
    const _id = userCredentials.user.uid;
    return this.userService.create({ email, name, lastName, _id });
  }

  @Delete()
  async remove(): Promise<string> {
    const auth = await this.authService.getCurrentUser();
    await this.authService.delete(auth);
    await this.userService.remove(auth.uid);
    return `User ${auth.uid} deleted`;
  }

  @Post('/signIn')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ReponseUserDto | unknown> {
    try {
      const userCredentials = await this.authService.signIn(email, password);
      const token = await userCredentials.user.getIdToken();
      response.cookie('idToken', token);
      const user = await this.userService.findByEmail(email);
      return user;
    } catch (err: unknown) {
      return err;
    }
  }

  @Get('/signOut')
  async signOut(): Promise<string> {
    const user = await this.authService.getCurrentUser();
    await this.authService.signOut();
    return `El usuario ${user.uid} se deslogueó`;
  }

  @Get()
  async getCurrent(@Req() request: Request): Promise<ReponseUserDto> {
    const idToken = request.cookies['idToken'];
    const decodedIdToken = await this.adminAuthService.authenticate(idToken);
    const user = await this.userService.findById(decodedIdToken.uid);
    return user;
  }

  @Patch()
  async update(
    @Body() updateData: UpdateUserDto,
    @Req() request: Request,
  ): Promise<ReponseUserDto | unknown> {
    try {
      const idToken = request.cookies['idToken'];
      const _id = (await this.adminAuthService.authenticate(idToken)).uid;
      const user = await this.userService.update(_id, updateData);
      return user;
    } catch (err: unknown) {
      return err;
    }
  }
}
