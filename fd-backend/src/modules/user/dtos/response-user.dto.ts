import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { IUser } from '../interfaces/user.interface';
import { IPackageRef } from '../../package/interface/package.interface';
import { UserStatus } from '../interfaces/user.interface';
import { IFormDB } from '../../../common/modules/formApply/interface/form-apply.interface';

export class ReponseUserDto implements Partial<IUser> {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  status: UserStatus;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsArray()
  packages: IPackageRef[];

  @IsNotEmpty()
  @IsArray()
  forms: IFormDB[];
}
