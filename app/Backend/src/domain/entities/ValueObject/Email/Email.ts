import BadRequest from '../../../error/typeErros/BadRequest';

export class Email {
  private _value: string;
  private readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(value: string) {
    if (!this.EMAIL_REGEX.test(value)) {
      throw new BadRequest('"email" must be a valid email');
    }
    this._value = value;
  }

  get value() {
    return this._value;
  }
  set value(value: string) {
    if (!this.EMAIL_REGEX.test(value)) {
      throw new BadRequest('"email" must be a valid email');
    }
    if (value === this._value) {
      throw new BadRequest('Email already registered');
    }

    this._value = value;
  }
}
