import { obsceneWordsDefault } from './../../shared/ObscenceWords';

/* eslint-disable no-unused-vars */
export interface ObsenceWordsInterface {
  obsceneValidate(value: string[] | RegExpMatchArray | null): boolean;
  execute(value: string): boolean;
}

export class CheckingObsceneWords implements ObsenceWordsInterface {
  public _obsceneWordsSet: Set<string>;
  private readonly _IGNORE_WHITE_SPACE: RegExp = /\s+/;
  private readonly _CHECK_FOR_NUMERIC_CHARACTERS: RegExp = /\d/;
  private readonly _IGNORE_SPECIAL_CHARACTERS: RegExp = /[a-zA-Z]+/g;

  constructor(obsceneArry?: string[]) {
    if (obsceneArry && obsceneArry.length > 0) {
      this._obsceneWordsSet = new Set(obsceneArry);
    } else {
      this._obsceneWordsSet = new Set(obsceneWordsDefault);
    }
  }

  get obsceneWords(): Set<string> {
    return this._obsceneWordsSet;
  }
  set obsceneWords(value: string[]) {
    this._obsceneWordsSet = new Set(value);
  }

  // algorithm O(n)
  obsceneValidate(value: string[] | RegExpMatchArray | null): boolean {
    if (value) {
      for (const word of value) {
        if (this._obsceneWordsSet.has(word)) {
          return true;
        }
      }
    }
    return false;
  }
  execute(value: string): boolean {
    const word = value.toLocaleLowerCase();
    if (this._CHECK_FOR_NUMERIC_CHARACTERS.test(word)) {
      return this.obsceneValidate(word.match(this._IGNORE_SPECIAL_CHARACTERS));
    }
    return this.obsceneValidate(word.split(this._IGNORE_WHITE_SPACE));
  }
}
