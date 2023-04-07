import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDBUserDto } from './dto/create-user.dto';
import { ReponseUserDto } from './dto/response-user.dto';


import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async checkUserEmail(email:string) {
    const response = await this.userRepository.checkUserEmail(email)
    if(response) throw new BadRequestException('El usuario ya esta registrado con ese email')
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
    const user = await this.userRepository.findOneById(_id);
    user.update(updateData);
    return user;
  }

  async addForm(_id: string, form: JSON) {
    const user = await this.userRepository.findOneById(_id)
    user.forms.push(form);
    const updatedUser = await user.save();
    return updatedUser;
  }
}
