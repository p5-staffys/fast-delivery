import { IUserRef } from 'src/modules/user/interfaces/user.interface';

export interface IUserLogs {
  date: Date;
  activeUsers: IUserRef[];
}
