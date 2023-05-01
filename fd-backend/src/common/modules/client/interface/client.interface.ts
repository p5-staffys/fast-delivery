import { AddressDTO } from '../../address/dto/Address.dto';
import { Ilatlng } from '../../address/interface/address.interface';

export interface IClient {
  fullName: string;
  address: AddressDTO;
  latlng: Ilatlng;
}
