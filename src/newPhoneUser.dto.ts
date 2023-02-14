import { IsDefined, IsPhoneNumber } from 'class-validator';

export default class newPhoneUserDTO {
  @IsDefined({ message: 'A telefonszám megadása kötelező!' });
  @IsPhoneNumber('HU',{message: 'Sajnos a megadott telefonszám nem jó'})
  phonenumber: number;
  @IsDefined({ message: 'A név megadása kötelező!' });
  name: string;
}
