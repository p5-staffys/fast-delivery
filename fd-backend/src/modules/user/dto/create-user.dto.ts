import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IUser } from '../interface/user.interface';

export class CreateUserDto implements Partial<IUser> {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@email.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Juan Carlos' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Macanudo' })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123123' })
  password: string;
}

export class CreateDBUserDto implements Partial<IUser> {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@email.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Juan Carlos' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Macanudo' })
  lastName: string;
}
