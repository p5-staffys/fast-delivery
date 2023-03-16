import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ReponseUserDto } from './dto/response-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(newUser: CreateUserDto): Promise<ReponseUserDto> {
    const uniqueId: User = await this.userModel.findById(newUser._id);

    if (uniqueId && uniqueId._id)
      throw new BadRequestException(
        'Un usuario ya se encuentra registrado con ese _id',
      );

    const uniqueMail: User = await this.userModel.findOne({
      email: newUser.email,
    });

    if (uniqueMail && uniqueMail.email)
      throw new BadRequestException(
        'Un usuario ya se encuentra registrado con ese correo',
      );

    return await this.userModel.create(newUser);
  }

  async remove(_id: string): Promise<ReponseUserDto> {
    return await this.userModel.findByIdAndDelete(_id);
  }
}
