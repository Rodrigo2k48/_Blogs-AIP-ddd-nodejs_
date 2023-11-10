import BadRequest from '../../../error/typeErros/BadRequest';
import bcrypt from 'bcrypt';
import { HashRepository } from '../../../repository/HashRepository';

export class Password implements HashRepository {
  private _value: string;
  private readonly _salt: number = 10;

  constructor(value: string) {
    if (value.length < 6) {
      throw new BadRequest('"password" length must be at least 6 characters long');
    }
    this._value = value;
  }
  get value() {
    return this._value;
  }
  set value(value: string) {
    if (value.length < 6) {
      throw new BadRequest('"password" length must be at least 6 characters long');
    }
    this._value = value;
  }
  public valueInHash() {
    return bcrypt.hashSync(this._value, this._salt);
  }
  public compare(passInDb: string): boolean {
    return bcrypt.compareSync(this._value, passInDb);
  }
}
