import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLogs, UserLogsSchema } from './entities/userLogs.entities';
import { UserLogsRepository } from './repository/userLogs.repository';
import { UserLogsService } from './userLogs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserLogs.name,
        schema: UserLogsSchema,
      },
    ]),
  ],
  providers: [UserLogsService, UserLogsRepository],
  exports: [UserLogsService, UserLogsRepository],
})
export class UserLogsModule {}
