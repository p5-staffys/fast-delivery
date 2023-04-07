import { Controller, Get, Delete } from '@nestjs/common';
import { SeedUsersService } from './seed-users.service';
import { SeedPackagesService } from './seed-packages.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Seed')
@Controller()
export class SeedController {
  constructor(
    private readonly seedUsersService: SeedUsersService,
    private readonly seedPackagesService: SeedPackagesService,
  ) {}


  @Get('/')
  async seed() {
    try {
      await this.seedUsersService.dropUsers();
      await this.seedUsersService.dropAdmins();
      await this.seedPackagesService.dropPackages();
      await this.seedUsersService.createUsers();
      await this.seedUsersService.createAdmin();
      await this.seedPackagesService.createPackages();
      return 'Base de datos seedeada con éxito';
    } catch (err: unknown) {
      return err;
    }
  }

  @Delete('/users')
  async dropUsers() {
    return this.seedUsersService.dropUsers();
  }

  @Get('/users')
  async seedUsers() {
    return this.seedUsersService.createUsers();
  }

  @Delete('/admins')
  async dropAdmins() {
    return this.seedUsersService.dropAdmins();
  }

  @Get('/admins')
  async seedAmin() {
    return this.seedUsersService.createAdmin();
  }

  @Delete('/packages')
  async dropPackages() {
    return this.seedPackagesService.dropPackages();
  }

  @Get('/packages')
  async seedPackages() {
    return this.seedPackagesService.createPackages();
}
}