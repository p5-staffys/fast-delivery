import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IAdmin } from '../interface/admin.interface';

export class CreateAdminDto implements Partial<IAdmin> {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'admin@admin.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'admin' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'admin' })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123123' })
  password: string;
}
