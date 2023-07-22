import Unauthorized from '../../../error/typeErros/Unauthorized';

export class Email {
  private _value: string;
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  constructor(value: string) {
    if (!Email.EMAIL_REGEX.test(value)) {
      throw new Unauthorized('"email" must be a valid email');
    }
    this._value = value;
  }

  get value() {
    return this._value;
  }
}