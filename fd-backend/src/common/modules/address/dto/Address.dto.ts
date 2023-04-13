import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IAdress } from '../interface/address.interface';

export class AddressDTO implements IAdress {
  // @IsString()
  // @AutoMap()
  // @ApiProperty({ type: String, example: 'Buenos Aires' })
  // city: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ type: String, example: 'Avenida Santa Fe' })
  street: string;

  //   @IsNumberString()
  //   @ApiProperty({ type: String, example: '1231' })
  //   number: string;

  //   @IsString()
  //   @ApiProperty({ type: String, example: 'Reja Blanca' })
  //   reference: string;
  //
}
