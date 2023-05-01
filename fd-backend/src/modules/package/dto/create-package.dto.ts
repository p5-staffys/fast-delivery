import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { AutoMap } from '@automapper/classes';
import { ClientDto } from '../../../common/modules/client/dto/client.dto';

export class CreatePackageDto {
  @AutoMap()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, example: 200 })
  weight: number;

  @AutoMap({ type: () => ClientDto })
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({ type: ClientDto })
  @ValidateNested({
    message:
      'Client tiene un objeto con propiedades fullname, address y latlng ',
  })
  @Type(() => ClientDto)
  client: ClientDto;

  @AutoMap()
  @IsNotEmpty()
  @IsDateString()
  @AutoMap()
  @ApiProperty({ type: Date, example: '2022-03-04' })
  deliveryDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @AutoMap()
  @ApiProperty({ type: Number, example: 1 })
  quantity: number;
}
