import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDBUserDto } from './dto/create-user.dto';
import { ReponseUserDto } from './dto/response-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(newUser: CreateDBUserDto): Promise<ReponseUserDto> {
    const uniqueId: User = await this.userModel.findById(newUser._id);

    if (uniqueId && uniqueId._id)
      throw new BadRequestException(
        'Un usuario ya se encuentra registrado con ese id',
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
    return this.userModel.findByIdAndDelete(_id);
  }

  async findById(_id: string): Promise<User> {
    return this.userModel.findById(_id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: email });
  }

  async update(_id: string, updateData: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(_id);
    user.update(updateData);
    return user;
  }

  async addForm(_id: string, form: JSON) {
    const user = await this.userModel.findById(_id);
    user.forms.push(form);
    const updatedUser = await user.save();
    return updatedUser;
  }
}
