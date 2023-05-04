import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from '../../../database/softdelete/softDelete.interface';
import { EntityRepository } from 'src/common/database/repository/db.repository';
import { UserLogs, UserLogsDocument } from '../entities/userLogs.entities';

@Injectable()
export class UserLogsRepository extends EntityRepository<UserLogsDocument> {
  constructor(
    @InjectModel(UserLogs.name)
    private readonly userLogsModel: Model<UserLogsDocument>,
  ) {
    super(userLogsModel);
  }
}
