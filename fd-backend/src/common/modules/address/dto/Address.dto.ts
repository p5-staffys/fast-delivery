import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IAdress, Ilatlng } from '../interface/address.interface';

export class AddressDTO implements IAdress {
  @AutoMap()
  @IsString()
  @ApiProperty({ type: String, example: '1231' })
  number: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ type: String, example: 'Avenida Santa Fe' })
  street: string;

  @IsString()
  @AutoMap()
  @ApiProperty({ type: String, example: 'Buenos Aires' })
  city: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ type: String, example: 'Buenos Aires' })
  state: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ type: String, example: 'Argentina' })
  country: string;
}

export class latlngDTO implements Ilatlng {
  @AutoMap()
  @IsString()
  @ApiProperty({ type: Number })
  lat: number;

  @AutoMap()
  @IsString()
  @ApiProperty({ type: Number })
  lng: number;
}
