import { AddressDTO } from '../../address/dto/Address.dto';

export interface IClient {
  fullName: string;
  address: AddressDTO;
}
