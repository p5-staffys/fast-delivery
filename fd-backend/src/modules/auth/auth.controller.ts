import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import {
  CreateUserDto,
  ResponseUserCreateDto,
} from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';

import { AuthService } from './auth.service';
import { LoginDto, Token } from './dto/auth.dto';

@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Endpoint registrar un usuario',
  })
  @ApiBody({ type: CreateUserDto, required: true })
  @ApiOkResponse({ type: ResponseUserCreateDto })
  @Post('register')
  async register(
    @Body() newUser: CreateUserDto,
  ): Promise<ResponseUserCreateDto> {
    return this.authService.register(newUser);
  }

  @ApiOperation({
    description: 'Endpoint para login',
  })
  @ApiBody({ type: LoginDto, required: true })
  @ApiOkResponse({ type: Token })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<Token> {
    return this.authService.login(loginDto);
  }
}
