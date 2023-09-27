import { describe, it, expect } from 'vitest';
import { CheckingObsceneWords } from '../CheckingObscenceWords';
import {
  OBSCENE_WORDS_FOR_NICK_NAMES_ARRAY,
  OBSCENE_WORDS_FOR_NICK_NAMES_SET,
  OBSCENE_WORDS_SET,
  OBSCENE_WORD_INCLUDES_IN_SET,
  OUTHER_ARRAY_OF_OBSCENE_WORDS,
  OUTHER_SET_OF_OBSCENE_WORDS,
  OBSCENE_WORDS_ARRAY,
} from './mocks/checkingObsceneWords.mock';

describe('ChekingObscenceWords Domain', () => {
  describe('in case of sucess', () => {
    it('should be possible to create a ChekinObscenceWords Instace', () => {
      const isObscenceWords = new CheckingObsceneWords();
      expect(isObscenceWords).toBeInstanceOf(CheckingObsceneWords);
    });
    it('should be possible to pass a custom array of offensive words', () => {
      const isObscenceWords = new CheckingObsceneWords(OBSCENE_WORDS_FOR_NICK_NAMES_ARRAY);
      expect(isObscenceWords.obsceneWords).toEqual(OBSCENE_WORDS_FOR_NICK_NAMES_SET);
      expect(isObscenceWords.execute(OBSCENE_WORD_INCLUDES_IN_SET)).toBeTruthy();
    });
    it('if no array is passed, it uses the default array defined within the class', () => {
      const checker = new CheckingObsceneWords();
      expect(checker.obsceneWords).not.toHaveLength(0);
      checker._obsceneWordsSet = OBSCENE_WORDS_FOR_NICK_NAMES_SET;
      expect(checker.execute(OBSCENE_WORD_INCLUDES_IN_SET)).toBeTruthy();
    });
    it('should be possivle to change the array of offensive words', () => {
      const isObscenceWords = new CheckingObsceneWords(OBSCENE_WORDS_ARRAY);
      expect(isObscenceWords.obsceneWords).toEqual(OBSCENE_WORDS_SET);
      isObscenceWords.obsceneWords = OUTHER_ARRAY_OF_OBSCENE_WORDS;
      expect(isObscenceWords.obsceneWords).toEqual(OUTHER_SET_OF_OBSCENE_WORDS);
    });
  });
});
