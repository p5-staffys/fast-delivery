import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { IPackage, PackageStatus } from '../interface/package.interface';
import {
  IClientRef,
  IUserRef,
} from 'src/modules/user/interface/user.interface';

export class CreatePackageDto implements Partial<IPackage> {
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsObject()
  createdBy: IUserRef;

  @IsNotEmpty()
  @IsObject()
  deliveredBy: IUserRef;

  @IsNotEmpty()
  @IsObject()
  client: IClientRef;

  @IsNotEmpty()
  @IsString()
  deliveryDate: Date;

  @IsNotEmpty()
  @IsString()
  deliveredOn: Date;

  @IsNotEmpty()
  @IsEnum(PackageStatus)
  status: PackageStatus;
}

export class ResponseCreatePackageDto extends CreatePackageDto {}
