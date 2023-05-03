import { Injectable } from '@nestjs/common';

import { IUserRef } from 'src/modules/user/interfaces/user.interface';
import { UserLogsRepository } from './repository/userLogs.repository';

@Injectable()
export class UserLogsService {
  constructor(private readonly userLogsRepository: UserLogsRepository) {}

  async recordUser(day: string, user: IUserRef) {
    const logEntry = await this.userLogsRepository.findOrCreate({ day });
    logEntry.activeUsers = [...logEntry.activeUsers, user];
    await logEntry.save();
    return logEntry;
  }

  async getRecordByDay(day: string) {
    return this.userLogsRepository.findOne({ day });
  }
}
