import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  Req,
  UseInterceptors,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminAuthService } from './admin-auth.service';

import { Request } from 'express';

import { User } from 'firebase/auth';
import { DecodedIdToken } from 'firebase-admin/auth';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUserInterceptor,
  CurrentUserRequest,
} from './middleware/current-user.interceptor';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminAuthService: AdminAuthService,
  ) {}

  @Get()
  async authenticate(@Req() request: Request): Promise<DecodedIdToken> {
    const idToken = request.cookies['idToken'];
    try {
      const decodedIdToken = await this.adminAuthService.authenticate(idToken);
      return decodedIdToken;
    } catch {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get('/current')
  async getCurrentUser(): Promise<User> {
    try {
      const user = await this.authService.getCurrentUser();
      return user;
    } catch {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Delete()
  async delete(): Promise<string> {
    try {
      const user = await this.authService.getCurrentUser();
      await this.authService.delete(user);
      return `User ${user.uid} deleted`;
    } catch {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @UseInterceptors(CurrentUserInterceptor)
  @Get('/signOut')
  async signOut(@Req() request: CurrentUserRequest): Promise<string> {
    try {
      await this.authService.signOut();
      return `User ${request.currentUser._id} hsa been signed out`;
    } catch {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Patch()
  async update(
    @Body('displayName') displayName: string,
    @Body('photoURL') photoURL: string,
  ): Promise<User | unknown> {
    try {
      const user = await this.authService.getCurrentUser();
      if (displayName) await this.authService.updateName(user, displayName);
      if (photoURL) await this.authService.updatePhotoURL(user, photoURL);
      const updatedUser = await this.authService.getCurrentUser();
      return updatedUser;
    } catch (error: unknown) {
      throw new BadRequestException('Bad Request', error);
    }
  }
}
