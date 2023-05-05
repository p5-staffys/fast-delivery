import { Controller, Get, Delete } from '@nestjs/common';
import { SeedUsersService } from './seed-users.service';
import { SeedPackagesService } from './seed-packages.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller()
export class SeedController {
  constructor(
    private readonly seedUsersService: SeedUsersService,
    private readonly seedPackagesService: SeedPackagesService,
  ) {}

  @ApiBearerAuth('idToken')
  @Get('/')
  async seed() {
    try {
      await this.seedUsersService.dropUsers();
      await this.seedUsersService.dropAdmins();
      await this.seedPackagesService.dropPackages();
      await this.seedUsersService.dropUserLogs();
      await this.seedUsersService.createUsers();
      await this.seedUsersService.createAdmin();
      await this.seedPackagesService.createPendingPackages();
      return 'Base de datos seedeada con éxito';
    } catch (err: unknown) {
      return err;
    }
  }

  @ApiBearerAuth('idToken')
  @Delete('/users')
  async dropUsers() {
    return this.seedUsersService.dropUsers();
  }

  @ApiBearerAuth('idToken')
  @Get('/users')
  async seedUsers() {
    return this.seedUsersService.createUsers();
  }

  @ApiBearerAuth('idToken')
  @Delete('/admins')
  async dropAdmins() {
    return this.seedUsersService.dropAdmins();
  }

  @ApiBearerAuth('idToken')
  @Get('/admins')
  async seedAmin() {
    return this.seedUsersService.createAdmin();
  }

  @ApiBearerAuth('idToken')
  @Delete('/packages')
  async dropPackages() {
    return this.seedPackagesService.dropPackages();
  }

  @ApiBearerAuth('idToken')
  @Get('/packages')
  async seedPackages() {
    return this.seedPackagesService.createPendingPackages();
  }
}
