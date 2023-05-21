import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { IAdmin } from '../interfaces/admin.interface';

export class UpdateAdminDto implements Partial<IAdmin> {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'admin' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'admin' })
  lastName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'https://example.picture.com' })
  avatarURL?: string;
}
