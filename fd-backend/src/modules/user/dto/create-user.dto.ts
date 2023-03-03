import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { IUser } from '../interface/user.interface';

export class CreateUserDto implements IUser {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Juan Carlos' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'test@email.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @ApiProperty({ example: '123123' })
  password: string;
}

export class ResponseUserCreateDto extends CreateUserDto {
  @Exclude()
  password: string;
}
