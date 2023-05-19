import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SingInDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'admin2@admin.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123123' })
  password: string;
}
