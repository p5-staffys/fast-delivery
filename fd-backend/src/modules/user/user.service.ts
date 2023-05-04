import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDBUserDto } from './dtos/create-user.dto';
import { ReponseUserDto } from './dtos/response-user.dto';

import { User } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { FormAplyDto } from '../../common/modules/formApply/dto/form-apply.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async checkUserEmail(email: string): Promise<void> {
    const response = await this.userRepository.checkUserEmail(email);
    if (response)
      throw new BadRequestException(
        'El usuario ya esta registrado con ese email',
      );
  }

  async create(newUser: CreateDBUserDto): Promise<ReponseUserDto> {
    const uniqueId: User = await this.userRepository.findOneById(newUser._id);

    if (uniqueId && uniqueId._id)
      throw new BadRequestException(
        'Un usuario ya se encuentra registrado con ese id',
      );

    return await this.userRepository.createEntity(newUser);
  }

  async remove(_id: string): Promise<ReponseUserDto> {
    return this.userRepository.findOneByIdAndDelete(_id);
  }

  async findById(_id: string): Promise<User> {
    return this.userRepository.findOneById(_id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(_id: string, updateData: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.updateEntityOrFail(
      { _id },
      updateData,
    );
    return user;
  }

  async addForm(_id: string, form: FormAplyDto): Promise<User> {
    const latestForm = await this.userRepository.foundUserAndValidateForm(_id);

    if (latestForm)
      throw new BadRequestException(
        'El usuario ya tiene un formulario en las ultimas 24hs',
      );

    const user = await this.userRepository.findOneById(_id);

    user.forms.push(form);

    const updatedUser = await user.save();
    return updatedUser;
  }

  async getUsers() {
    return this.userRepository.find({});
  }

  async getActiveUsers() {
    return this.userRepository.find({ active: true });
  }

  async changeUserStatus(_id: string) {
    const user = await this.userRepository.findOneById(_id);
    user.active = !user.active;
    user.save();
    return true;
  }

  async countUsers() {
    return this.userRepository.findAndCountOrFail({});
  }
}
