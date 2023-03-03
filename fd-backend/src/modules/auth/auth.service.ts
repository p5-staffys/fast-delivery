import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  ResponseUserCreateDto,
} from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InvalidCredentials } from './exceptions/auth.exceptions';
import { User } from '../user/entities/user.entity';
import { LoginDto, Token } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(newUser: CreateUserDto): Promise<ResponseUserCreateDto> {
    return this.usersService.create(newUser);
  }
  //dto
  async login({ email, password }: LoginDto): Promise<Token> {
    //si Email no es correcto, throw
    const user = await this.usersService.findByEmail(email);

    //SI pass no es correcto, throw
    await this.verifyData(password, user.password);

    return this.generateJwt(user);
  }

  private readonly generateJwt = (
    payload: User,
    options?: JwtSignOptions,
  ): {
    acces_token: string;
  } => {
    const tokenUser = {
      sub: payload._id,
    };
    return { acces_token: this.jwtService.sign(tokenUser) };
  };

  private readonly verifyData = async (
    password: string,
    userPassword: String,
  ): Promise<void> => {
    const isValid = await bcrypt.compare(password, userPassword);
    if (!isValid) {
      throw new InvalidCredentials();
    }
  };
}
