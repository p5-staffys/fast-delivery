import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../../modules/user/entities/user.entity';
import { Admin, AdminSchema } from '../../modules/admin/entities/admin.entity';
import {
  Package,
  PackageSchema,
} from '../../modules/package/entities/package.entity';
import {
  UserLogs,
  UserLogsSchema,
} from '../../common/modules/userLogs/entities/userLogs.entities';
import { SeedController } from './seed.controller';
import { SeedUsersService } from './seed-users.service';
import { SeedPackagesService } from './seed-packages.service';

@Module({
  controllers: [SeedController],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Package.name,
        schema: PackageSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: UserLogs.name,
        schema: UserLogsSchema,
      },
    ]),
  ],
  providers: [SeedUsersService, SeedPackagesService],
  exports: [],
})
export class SeedModule {}
