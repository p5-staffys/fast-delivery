import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IAuth } from '../interface/auth.interface';

export class CreateAuthDto implements IAuth {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'test@email.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123123' })
  password: string;
}

export class ResponseCreateAuthDto extends CreateAuthDto {}
