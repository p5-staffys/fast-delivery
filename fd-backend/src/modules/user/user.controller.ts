import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ReponseUserDto } from './dto/response-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() newUser: CreateUserDto): Promise<ReponseUserDto> {
    return this.userService.create(newUser);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ReponseUserDto> {
    return this.userService.remove(id);
  }
  /*@Get()
  findAll(): string {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): string {
    return this.userService.update(+id, updateUserDto);
  }

  */
}
