import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { PackageStatus } from '../../modules/package/interface/package.interface';

export class QueryStatusDto {
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(PackageStatus)
  @ApiProperty({
    type: String,
    enum: PackageStatus,
    required: false,
  })
  status?: PackageStatus;
}
