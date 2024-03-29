import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'admin' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'admin' })
  lastName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'https://example.picture.com' })
  avatarURL?: string;
}
