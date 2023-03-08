import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, ResponseUserCreateDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(newUser: CreateUserDto): Promise<ResponseUserCreateDto> {
    const uniqueMail: User = await this.userModel.findOne({
      email: newUser.email,
    });

    if (uniqueMail && uniqueMail.email)
      throw new BadRequestException(
        'Un usuario ya se encuentra registrado con ese correo',
      );

    return await this.userModel.create(newUser);
  }
}
