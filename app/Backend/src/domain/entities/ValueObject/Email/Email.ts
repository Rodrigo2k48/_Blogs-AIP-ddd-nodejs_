import BadRequest from '../../../error/typeErros/BadRequest';

export class Email {
  private _value: string;
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  constructor(value: string) {
    if (!Email.EMAIL_REGEX.test(value)) {
      throw new BadRequest('"email" must be a valid email');
    }
    this._value = value;
  }

  get value() {
    return this._value;
  }
}