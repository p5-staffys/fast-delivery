import { IsNotEmpty, IsString } from 'class-validator';
import { IUserRef } from '../interfaces/user.interface';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UserRefDTO implements IUserRef {
  @IsString()
  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: '123312sa231sd-123123asdas-2' })
  _id: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ type: String, example: 'Juan Carlos' })
  name: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ type: String, example: 'Macanudo' })
  lastName: string;
}
