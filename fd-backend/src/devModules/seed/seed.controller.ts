import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller()
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  @ApiOperation({ description: 'Create seed' })
  async seedPackage() {
    return 'Just for test';
  }
}
