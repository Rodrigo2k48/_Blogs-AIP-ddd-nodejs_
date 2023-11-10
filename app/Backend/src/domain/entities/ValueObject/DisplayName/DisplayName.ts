import BadRequest from '../../../error/typeErros/BadRequest';
import Forbidden from '../../../error/typeErros/Forbidden';
import { CheckingObsceneWords, ObsenceWordsInterface } from '../../CheckingObsceneWords/CheckingObscenceWords';

export class DisplayName {
  private _value: string;
  private readonly _obscenceWordsChecker: ObsenceWordsInterface;

  constructor(value: string) {
    if (value.length > 26) {
      throw new Forbidden('Name must be max 26 characters. Enter a valid name.');
    }
    if (value.length < 3) {
      throw new Forbidden('Name must be min 3 characters. Enter a valid name.');
    }
    this._value = value;
    this._obscenceWordsChecker = new CheckingObsceneWords();
  }

  get value(): string {
    if (!this._obscenceWordsChecker.execute(this._value)) {
      return this._value;
    } else {
      throw new Forbidden('Cannot create username with these words. Try others.');
    }
  }

  set value(value: string) {
    if (value === this._value) {
      throw new BadRequest('Display Name already registered! Please try other name');
    }
    if (!this._obscenceWordsChecker.execute(value)) {
      this._value = value;
    } else {
      throw new Forbidden('Cannot create username with these words. Try others.');
    }
  }
}
