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

import { AuthService } from '../../common/firebase/auth.service';

import { ReponseUserDto } from './dtos/response-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUserRequest } from './interceptors/current-user.interceptor';

import {
  ApiBearerAuth,
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Public } from '../../common/guards/auth.guard';
import { FormAplyDto } from '../../common/modules/formApply/dto/form-apply.dto';
import { User } from './entities/user.entity';
import { GeneralError } from '../../common/error-handlers/exceptions';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ description: 'Crear nuevo usuario en la DB' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    type: ReponseUserDto,
  })
  @Public()
  @Post()
  async create(@Body() newUser: CreateUserDto): Promise<ReponseUserDto> {
    const { password, email, name, lastName } = newUser;
    //await this.userService.checkUserEmail(email);
    try {
      const _id = (await this.authService.create(email, password, false)).uid;
      return this.userService.create({ email, name, lastName, _id });
    } catch (error: unknown) {
      throw new GeneralError(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ description: 'Obtener los datos del usuario logueado' })
  @ApiBearerAuth('idToken')
  @UseInterceptors(CurrentUserInterceptor)
  @ApiResponse({
    status: 200,
    type: ReponseUserDto,
  })
  @Get()
  async getCurrent(
    @Req() request: CurrentUserRequest,
  ): Promise<ReponseUserDto> {
    const currentUser = request.currentUser;
    return currentUser;
  }

  @ApiOperation({ description: 'Autenticar el usuario logueado' })
  @ApiBearerAuth('idToken')
  @ApiResponse({
    status: 200,
  })
  @Get('authenticate')
  async authenticate(): Promise<boolean> {
    return true;
  }

  @ApiOperation({ description: 'Borrar el usuario logueado' })
  @ApiBearerAuth('idToken')
  @ApiResponse({
    status: 200,
    type: 'Usuario eliminado de la DB',
  })
  @UseInterceptors(CurrentUserInterceptor)
  @Delete()
  async delete(@Req() request: CurrentUserRequest): Promise<string> {
    try {
      const _id = request.currentUser._id;
      await this.userService.remove(_id);
      return `Usuario eliminado de la DB`;
    } catch {
      throw new GeneralError('No se pudo eliminar el usuario');
    }
  }

  @ApiOperation({ description: 'Atualizar los datos del usuario logueado' })
  @ApiBearerAuth('idToken')
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    type: ReponseUserDto,
  })
  @UseInterceptors(CurrentUserInterceptor)
  @Patch()
  async update(
    @Body() updateData: UpdateUserDto,
    @Req() request: CurrentUserRequest,
  ): Promise<ReponseUserDto> {
    try {
      const _id = request.currentUser._id;
      const user = await this.userService.update(_id, updateData);
      return user;
    } catch {
      throw new GeneralError('No se pudo actualizar el usuario');
    }
  }

  @ApiOperation({ description: 'Agrega el formulario al usuario logueado' })
  @ApiBearerAuth('idToken')
  @ApiBody({ type: FormAplyDto })
  @UseInterceptors(CurrentUserInterceptor)
  @Post('/addForm')
  async addForm(
    @Body() form: FormAplyDto,
    @Req() { currentUser }: CurrentUserRequest,
  ): Promise<User> {
    return await this.userService.addForm(currentUser._id, form);
  }
}
