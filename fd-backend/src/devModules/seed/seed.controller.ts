import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller()
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  async seedPackage() {
    return 'Just for test';
  }
}
