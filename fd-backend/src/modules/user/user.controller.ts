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
  Headers,
  Param,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';

import { AuthService } from '../../common/modules/firebase/auth.service';

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
  ApiParam,
} from '@nestjs/swagger';
import { Public } from '../../common/guards/auth.guard';
import { FormAplyDto } from '../../common/modules/formApply/dto/form-apply.dto';
import { User } from './entities/user.entity';
import { GeneralError } from '../../common/error-handlers/exceptions';
import { UserLogsService } from '../../common/modules/userLogs/userLogs.service';
import { assignPacakges, IUserRef } from './interfaces/user.interface';
import { Types } from 'mongoose';
import { PackageService } from '../package/package.service';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly userLogsService: UserLogsService,
    private readonly packageService: PackageService,
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
  @Public()
  @Get('authenticate')
  async authenticate(
    @Headers('Authorization') authorization,
  ): Promise<boolean> {
    try {
      await this.authService.authenticate(authorization);
      return true;
    } catch (error: unknown) {
      return false;
    }
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

  @ApiBearerAuth('idToken')
  @ApiParam({ name: '_id', required: true, type: String })
  @ApiOperation({ description: 'Delete package from history' })
  @UseInterceptors(CurrentUserInterceptor)
  @Delete('package/:_id')
  async deleteFromHistory(
    @Param('_id') _id: Types.ObjectId,
    @Req() { currentUser }: CurrentUserRequest,
  ): Promise<User> {
    const updatedUser = await this.userService.deteleteFromHistory(
      _id,
      currentUser,
    );
    return updatedUser;
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
    try {
      const updatedUser = await this.userService.addForm(currentUser._id, form);
      const date = updatedUser.forms[updatedUser.forms.length - 1].createdAt
        .toJSON()
        .split('T')[0];
      const userRef: IUserRef = {
        fullName: `${updatedUser.name} ${updatedUser.lastName}`,
        _id: updatedUser._id,
        email: updatedUser.email,
      };
      await this.userLogsService.recordUser(date, userRef);
      return updatedUser;
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }

  @Put('package/assign')
  @ApiBearerAuth('idToken')
  @ApiOperation({ description: 'Agrega paquetes al usuario logueado.' })
  @ApiBody({ type: Array, description: 'Array de Ids de paquetes' })
  @UseInterceptors(CurrentUserInterceptor)
  async assignToUser(
    @Req() { currentUser }: CurrentUserRequest,
    @Body() packages: Types.ObjectId[],
  ): Promise<assignPacakges> {
    try {
      const { updatedPackages, missingPackages } =
        await this.packageService.assignPackagesToUser(packages, currentUser);
      const packagesRef = updatedPackages.map((pack) => {
        return {
          _id: pack._id,
          client: {
            fullName: pack.client.fullName,
            address: `${pack.client.address.street} ${pack.client.address.number}, ${pack.client.address.city}, ${pack.client.address.state}, ${pack.client.address.country}`,
          },
          deliveryDate: pack.deliveryDate,
          status: pack.status,
        };
      });
      const { updatedUser, alreadyAssigned } =
        await this.userService.assignPackagesToHistory(
          currentUser,
          packagesRef,
        );

      const errors = [...missingPackages, ...alreadyAssigned];

      return { updatedUser, errors };
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }
}
