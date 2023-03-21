import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IClient, IAdress } from '../interface/client.interface';

export class CreateClientDto implements Partial<IClient> {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Juan Carlos Macanudo' })
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@email.com' })
  adress: IAdress;
}

export class ResponseCreateClientDto extends CreateClientDto {
  @IsNotEmpty()
  @IsString()
  _id;
}
