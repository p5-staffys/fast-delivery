import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IAuth } from '../interface/auth.interface';

export class CreateAuthDto implements IAuth {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Juan Carlos' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Macanudo' })
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'test@email.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'test@email.com' })
  password: string;
}

export class ResponseCreateAuthDto extends CreateAuthDto {}
