import { PickType } from '@nestjs/swagger';
import { CreatePackageDto } from './create-package.dto';

type arrResponsePackageDto = keyof CreatePackageDto;

export const arrResponsePackage: arrResponsePackageDto[] = [
  'client',
  'deliveryDate',
  'weight',
];

export class ReponsePackageDto extends PickType(
  CreatePackageDto,
  arrResponsePackage,
) {}
