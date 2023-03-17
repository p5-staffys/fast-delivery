import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

import { Request, Response } from 'express';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() body: CreateAuthDto) {
    const { email, password, name, lastName } = body;
    const newAuth = await this.authService.create(email, password);
    const newUser = await this.userService.create({
      _id: newAuth.UserSub,
      email,
      name,
      lastName,
    });
    return newUser;
  }

  @Post('/confirm')
  async confirm(
    @Body('email') email: string,
    @Body('confirmCode') confirmCode: string,
  ) {
    return this.authService.confirm(email, confirmCode);
  }

  @Post('/signIn')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() response: Response,
  ) {
    return this.authService.signIn(email, password).then((result) => {
      const token = result.AuthenticationResult.AccessToken;
      response.cookie('token', token).send('user logged in');
    });
  }

  @Get()
  async authenticate(@Req() request: Request) {
    const response = await this.authService.authenticate(
      request.cookies['token'],
    );
    return response;
  }

  @Delete()
  async remove(@Req() request: Request) {
    const response = await this.authService.authenticate(
      request.cookies['token'],
    );
    return response;
  }

  @Get('/current')
  async getCurrentUser(@Req() request: Request) {
    return this.authService.getCurrentUser(request.cookies['token']);
  }

  @Get('/signOut')
  async signOut(@Req() request: Request) {
    return this.authService.signOut(request.cookies['token']);
  }

  @Get()
  findAll(): string {
    return this.authService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') id: string): string {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('_id') id: string): string {
    return this.authService.update(+id);
  }
}
