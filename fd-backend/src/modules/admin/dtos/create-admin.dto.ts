import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IAdmin } from '../interfaces/admin.interface';

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

export class CreateDBAdminDto implements Partial<IAdmin> {
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
