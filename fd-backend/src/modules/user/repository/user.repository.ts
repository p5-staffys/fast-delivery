import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../../common/database/repository/db.repository';
import { User, UserDocument } from '../entities/user.entity';

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  async findOneById(_id: string) {
    return await this.findOneOrFail({ _id });
  }

  async findOneByIdAndDelete(_id: string) {
    return await this.findByIdAndDelete({ _id });
  }

  async checkUserEmail(email): Promise<boolean> {
    const uniqueMail = await this.userModel.findOne({ email });
    if (uniqueMail && uniqueMail.email) return true;
    return false;
  }

  async foundUserAndValidateForm(_id) {
    return await this.userModel.findOne({
      _id,
      forms: {
        $elemMatch: {
          createdAt: {
            $gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Fecha actual menos 24 horas
          },
        },
      },
    });
  }
}