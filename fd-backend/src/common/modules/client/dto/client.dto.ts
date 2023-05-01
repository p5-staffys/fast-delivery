import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressDTO, latlngDTO } from '../../address/dto/Address.dto';

import { IClient } from '../interface/client.interface';

export class ClientDto implements IClient {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @ApiProperty({ example: 'Juan Carlos Macanudo' })
  @AutoMap()
  fullName: string;

  @IsNotEmpty()
  @IsDefined()
  @AutoMap()
  @ApiProperty({ type: AddressDTO })
  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO;

  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ type: latlngDTO })
  @AutoMap()
  latlng: { lat: number; lng: number };
}
