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
  HttpStatus,
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
import { FormAplyDto } from '../../common/modules/formApply/dto/form-apply.dto';
import { User } from './entities/user.entity';
import { GeneralError } from '../../common/error-handlers/exceptions';

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
    try {
      const _id = (await this.authService.create(email, password)).user.uid;
      return this.userService.create({ email, name, lastName, _id });
    } catch {
      throw new GeneralError(
        'No fue posible registrarse',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete()
  async remove(): Promise<string> {
    try {
      const auth = await this.authService.getCurrentUser();
      await this.authService.delete(auth);
      await this.userService.remove(auth.uid);
      return `User ${auth.uid} deleted`;
    } catch {
      throw new GeneralError('No se pudo eliminar el usuario');
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
      response.cookie('idToken', token);
      const _id = userCredentials.user.uid;
      const user = await this.userService.findById(_id);
      return { user, token };
    } catch {
      throw new GeneralError(
        'Email o password incorrecto',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('/signOut')
  async signOut(): Promise<string> {
    try {
      const user = await this.authService.getCurrentUser();
      await this.authService.signOut();
      return `El usuario ${user.uid} se deslogueó`;
    } catch {
      throw new GeneralError('No se pudo desloguear el usuario');
    }
  }

  @UseInterceptors(CurrentUserInterceptor)
  @Get()
  async getCurrent(
    @Req() request: CurrentUserRequest,
  ): Promise<ReponseUserDto> {
    try {
      const currentUser = request.currentUser;
      return currentUser;
    } catch {
      throw new GeneralError('No se pudo devolver el usuario');
    }
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
