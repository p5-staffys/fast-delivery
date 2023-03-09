import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ResponseUserCreateDto } from './dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() newUser: CreateUserDto): Promise<ResponseUserCreateDto> {
    return this.userService.create(newUser);
  }

  /*  @Get()
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

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.userService.remove(+id);
  } */
}
