import { Injectable } from '@nestjs/common';

import { IUserRef } from 'src/modules/user/interfaces/user.interface';
import { UserLogsRepository } from './repository/userLogs.repository';

@Injectable()
export class UserLogsService {
  constructor(private readonly userLogsRepository: UserLogsRepository) {}

  async recordUser(stringDate: string, user: IUserRef) {
    const date = new Date(stringDate);
    const logEntry = await this.userLogsRepository.findOrCreate({ date });
    logEntry.activeUsers = [...logEntry.activeUsers, user];
    await logEntry.save();
    return logEntry;
  }

  async getRecordByDate(date: Date) {
    return this.userLogsRepository.findOne({ date });
  }
}
