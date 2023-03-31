import { Controller, Get, Body, Patch, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminAuthService } from './admin-auth.service';

import { Request } from 'express';

import { User } from 'firebase/auth';
import { DecodedIdToken } from 'firebase-admin/auth';
import { ApiTags } from '@nestjs/swagger';

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
    const decodedIdToken = await this.adminAuthService.authenticate(idToken);
    return decodedIdToken;
  }

  @Get('/current')
  async getCurrentUser(): Promise<User> {
    const user = await this.authService.getCurrentUser();
    return user;
  }

  @Delete()
  async delete(): Promise<string> {
    const user = await this.authService.getCurrentUser();
    await this.authService.delete(user);
    return `User ${user.uid} deleted`;
  }

  @Get('/signOut')
  async signOut(): Promise<string> {
    const user = await this.authService.getCurrentUser();
    await this.authService.signOut();
    return `User ${user.uid} hsa been signed out`;
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
    } catch (err: unknown) {
      return err;
    }
  }
}
