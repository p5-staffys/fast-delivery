import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IAuth } from '../interface/auth.interface';

export class CreateAuthDto implements IAuth {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'test@email.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'test@email.com' })
  password: string;
}

export class ResponseCreateAuthDto extends CreateAuthDto {}
