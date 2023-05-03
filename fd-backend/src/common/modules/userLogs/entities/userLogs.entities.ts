import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { IUserRef } from 'src/modules/user/interfaces/user.interface';
import { IUserLogs } from '../interface/userLogs.interface';

export type UserLogsDocument = HydratedDocument<UserLogs>;

@Schema()
export class UserLogs implements IUserLogs {
  @Prop({ required: [true, 'Please enter a date'], type: Date })
  readonly date: Date;

  @Prop({ type: [], default: [] })
  activeUsers: IUserRef[];
}

export const UserLogsSchema = SchemaFactory.createForClass(UserLogs);
