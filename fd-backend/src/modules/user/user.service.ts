import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDBUserDto } from './dtos/create-user.dto';
import { ReponseUserDto } from './dtos/response-user.dto';

import { User } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { FormAplyDto } from '../../common/modules/formApply/dto/form-apply.dto';
import {
  IPackageRef,
  PackageStatus,
} from '../package/interface/package.interface';
import { Document, Types } from 'mongoose';

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

  async findById(_id: string) {
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
      throw 'El usuario ya tiene un formulario en las ultimas 24hs.';

    if (
      form.bebidasAlcoholicas ||
      form.medicamentosPsicoactivos ||
      form.problemaEmocional
    )
      throw 'El usuario falló la aprobación del formulario.';

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

  async assignPackage(
    user: Document<unknown, User> &
      Omit<
        User &
          Required<{
            _id: string;
          }>,
        never
      >,
    packageRef: IPackageRef,
  ) {
    const checkRepeted = user.packages.find(
      (pack) => pack._id == packageRef._id,
    );

    if (checkRepeted) throw 'Este paquete ya está asignado a este usuario';
    user.packages = [...user.packages, packageRef];
    const updateUser = await user.save();
    return updateUser;
  }

  async assignPackagesToHistory(
    user: Document<unknown, User> &
      Omit<
        User &
          Required<{
            _id: string;
          }>,
        never
      >,
    packageRef: IPackageRef[],
  ) {
    const packages: IPackageRef[] = [];
    const alreadyAssigned = [];

    for (let i = 0; i < packageRef.length; i++) {
      const checkRepeted = user.packages.find(
        (pack) => pack._id == packageRef[i]._id,
      );
      if (checkRepeted) {
        alreadyAssigned.push(
          `El paquete ${packageRef[i]._id} ya está asignado a este usuario`,
        );
      } else {
        packages.push(packageRef[i]);
      }
    }

    user.packages = [...user.packages, ...packages];
    const updatedUser = await user.save();
    return { updatedUser, alreadyAssigned };
  }

  async deteleteFromHistory(
    _id: Types.ObjectId,
    user: Document<unknown, User> &
      Omit<
        User &
          Required<{
            _id: string;
          }>,
        never
      >,
  ): Promise<User> {
    user.packages = user.packages.filter((pack) => pack._id != _id);
    await user.save();
    return user;
  }

  async changePackageRefStatus(
    user: Document<unknown, User> &
      Omit<
        User &
          Required<{
            _id: string;
          }>,
        never
      >,
    packages: Types.ObjectId[],
    status: PackageStatus,
  ) {
    for (let i = 0; i < user.packages.length; i++) {
      for (let j = 0; j < packages.length; j++) {
        if (user.packages[i]._id == packages[j])
          user.packages[i].status = status;
      }
    }
    user.save();
    return user;
  }
}
