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
// import { CreateAuthDto } from './dto/create-auth.dto';

import { Request, Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.create(email, password);
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

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string): string {
    return this.authService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.authService.remove(+id);
  }
}
