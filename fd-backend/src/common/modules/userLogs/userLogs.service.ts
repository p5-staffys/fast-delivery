import { Injectable } from '@nestjs/common';

import { IUserRef } from 'src/modules/user/interfaces/user.interface';
import { UserLogsDocument } from './entities/userLogs.entities';
import { UserLogsRepository } from './repository/userLogs.repository';

@Injectable()
export class UserLogsService {
  constructor(private readonly userLogsRepository: UserLogsRepository) {}

  async recordUser(date: Date, user: IUserRef) {
    const logEntry = await this.userLogsRepository.findOrCreate({ date });
    logEntry.activeUsers = [...logEntry.activeUsers, user];
    await logEntry.save();
    return logEntry;
  }

  async getRecordByDate(date: Date): Promise<UserLogsDocument> {
    return await this.userLogsRepository.findOrCreate({ date });
  }
}
