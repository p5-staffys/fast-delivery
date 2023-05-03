import { IUserRef } from 'src/modules/user/interfaces/user.interface';

export interface IUserLogs {
  day: string;
  activeUsers: IUserRef[];
}
