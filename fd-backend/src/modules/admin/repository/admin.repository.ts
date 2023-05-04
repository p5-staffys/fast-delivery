import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from '../../../common/database/softdelete/softDelete.interface';
import { EntityRepository } from '../../../common/database/repository/db.repository';
import { Admin, AdminDocument } from '../entities/admin.entity';

@Injectable()
export class AdminRepository extends EntityRepository<AdminDocument> {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
  ) {
    super(adminModel);
  }

  async findOneById(_id: string) {
    return await this.adminModel.findById(_id);
  }

  async findOneByIdAndDelete(_id: string) {
    return await this.findByIdAndDelete({ _id });
  }

  async checkAdminEmail(email: string): Promise<boolean> {
    return await this.adminModel.findOne({ email });
  }

  async checkAdminId(_id: string): Promise<boolean> {
    return await this.adminModel.findById(_id);
  }
}
