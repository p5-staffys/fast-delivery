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
import { GeneralError } from '../../common/error-handlers/exceptions';
import { UserLogsService } from '../../common/modules/userLogs/userLogs.service';
import {
  IAddForm,
  IAssignPacakges,
  IDeliverPackages,
  IUnassignPackage,
  IUserRef,
} from './interfaces/user.interface';
import { Types } from 'mongoose';
import { PackageService } from '../package/package.service';
import { UserDocument } from './entities/user.entity';

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

  @ApiOperation({ description: 'Crear nuevo usuario en la DB' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    type: ReponseUserDto,
  })
  @Public()
  @Post('create/:_id')
  async createWithId(
    @Param('_id') _id: string,
    @Body() newUser: Partial<{ email: string; fullName: string }>,
  ): Promise<ReponseUserDto> {
    const { email, fullName } = newUser;
    //await this.userService.checkUserEmail(email);
    try {
      const name = fullName.split(' ')[0];
      const lastName = fullName.split(' ')[1];
      return this.userService.create({ email, name, lastName, _id });
    } catch (error: unknown) {
      throw new GeneralError(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ description: 'Obtener los datos del usuario logueado' })
  @ApiBearerAuth('idToken')
  @ApiResponse({
    status: 200,
    type: ReponseUserDto,
  })
  @UseInterceptors(CurrentUserInterceptor)
  @Get()
  async getCurrent(
    @Req() request: CurrentUserRequest,
  ): Promise<ReponseUserDto> {
    const currentUser = request.currentUser;
    return currentUser;
  }

  @ApiOperation({ description: 'Autenticar el usuario logueado.' })
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

  @ApiOperation({ description: 'Autenticar el usuario logueado.' })
  @ApiBearerAuth('idToken')
  @ApiResponse({
    status: 200,
  })
  @Public()
  @Get('isInDB')
  async checkIfUserIsInDB(
    @Headers('Authorization') authorization,
  ): Promise<boolean> {
    try {
      const auth = await this.authService.authenticate(authorization);
      const _id = auth.uid;
      const user = await this.userService.findById(_id);
      if (user) return true;
      return false;
    } catch (error: unknown) {
      return false;
    }
  }

  @ApiOperation({ description: 'Borrar el usuario logueado.' })
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

  @ApiOperation({ description: 'Atualizar los datos del usuario logueado.' })
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

  @ApiOperation({
    description:
      'Borrar el paquete pasado por Id del historial del usuario logueado.',
  })
  @ApiBearerAuth('idToken')
  @ApiParam({ name: '_id', required: true, type: String })
  @UseInterceptors(CurrentUserInterceptor)
  @Delete('package/:_id')
  async deleteFromHistory(
    @Param('_id') _id: Types.ObjectId,
    @Req() { currentUser }: CurrentUserRequest,
  ): Promise<IUnassignPackage> {
    const updatedUser = await this.userService.deteleteFromHistory(
      _id,
      currentUser,
    );
    const updatedPacakge = await this.packageService.unassignFromUser(_id);

    return { updatedUser, updatedPacakge };
  }

  @ApiOperation({ description: 'Agregar el formulario al usuario logueado.' })
  @ApiBearerAuth('idToken')
  @ApiBody({ type: FormAplyDto })
  @UseInterceptors(CurrentUserInterceptor)
  @Post('/addForm')
  async addForm(
    @Body() formAply: FormAplyDto,
    @Req() { currentUser }: CurrentUserRequest,
  ): Promise<IAddForm> {
    try {
      const date = new Date(formAply.date);
      const checkForm = await this.userService.checkForm24h(currentUser, date);
      if (!checkForm)
        return {
          ok: false,
          message: 'El usuario ya tiene un formulario en las ultimas 24hs.',
        };

      const form = formAply.form;
      const ok = await this.userService.checkForm(form);
      const updatedUser = await this.userService.addForm(
        currentUser,
        form,
        date,
        ok,
      );
      if (!ok)
        return {
          ok: false,
          message: 'Falló la validación del formulario, no puede trabajar hoy.',
        };
      await this.userService.activate(currentUser);
      const userRef: IUserRef = {
        fullName: `${updatedUser.name} ${updatedUser.lastName}`,
        _id: updatedUser._id,
        email: updatedUser.email,
        avatarURL: updatedUser.avatarURL,
      };
      await this.userLogsService.recordUser(date, userRef);
      return {
        ok: true,
        message: 'Aprobó la validación del formulario, puede trabajar hoy.',
      };
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }

  @ApiOperation({ description: 'Agregar paquetes al usuario logueado.' })
  @ApiBearerAuth('idToken')
  @ApiBody({ type: Array, description: 'Array de Ids de paquetes' })
  @UseInterceptors(CurrentUserInterceptor)
  @Put('package/assign')
  async assignToUser(
    @Req() { currentUser }: CurrentUserRequest,
    @Body() packages: Types.ObjectId[],
  ): Promise<IAssignPacakges> {
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

  @ApiOperation({ description: 'Marcar paquetes como entregados.' })
  @ApiBearerAuth('idToken')
  @ApiBody({ type: Array, description: 'Array de Ids de paquetes entregados.' })
  @UseInterceptors(CurrentUserInterceptor)
  @Put('package/delivered')
  async delivered(
    @Req() { currentUser }: CurrentUserRequest,
    @Body() packagesIds: Types.ObjectId[],
  ): Promise<IDeliverPackages> {
    try {
      const updatedPackages = await this.packageService.deliverPackages(
        packagesIds,
      );
      let updatedUser: UserDocument;
      for (let i = 0; i < packagesIds.length; i++) {
        updatedUser = await this.userService.changePackageRefStatusToDelivered(
          currentUser,
          packagesIds[i].toString(),
        );
      }

      const checkRemainingPacakges =
        await this.userService.checkRemainingPacakges(updatedUser);
      if (!checkRemainingPacakges) this.userService.deActivate(updatedUser);

      updatedUser = await this.userService.findById(currentUser._id);
      return { updatedUser, updatedPackages };
    } catch (error: unknown) {
      throw new GeneralError(error);
    }
  }
}
