import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageSchema } from './entities/package.entity';
import { PackageRepository } from './repository/package.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Package.name,
        schema: PackageSchema,
      },
    ]),
  ],
  controllers: [PackageController],
  providers: [PackageService, PackageRepository],
})
export class PackageModule {}
