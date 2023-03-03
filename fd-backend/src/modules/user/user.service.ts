import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, ResponseUserCreateDto } from './dto/create-user.dto';

import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { InvalidCredentials } from '../auth/exceptions/auth.exceptions';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(newUser: CreateUserDto): Promise<ResponseUserCreateDto> {
    const uniqueMail: User = await this.userRepository.findOne({
      email: newUser.email,
    });

    if (uniqueMail && uniqueMail.email)
      throw new BadRequestException(
        'Un usuario ya se encuentra registrado con ese correo',
      );

    return await this.userRepository.createEntity(newUser);
  }

  readonly findByEmail = async (email: string): Promise<User> => {
    const user = await this.userRepository.findOne({
      email,
    });
    if (!user) throw new InvalidCredentials();

    return user;
  };
}
