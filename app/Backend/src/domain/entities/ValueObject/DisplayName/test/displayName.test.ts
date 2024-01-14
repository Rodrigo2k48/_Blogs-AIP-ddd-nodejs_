import { describe, it, expect } from 'vitest';
import { DisplayName } from '../DisplayName';
import { DISPLAY_NAME_INVALID, DISPLAY_NAME_MINIMUM_INVALID_CHARACTERS, DISPLAY_NAME_VALID, OTHER_DISPLAY_NAME_VALID } from './../../../../shared/mocks/DisplayName';
import Sinon from 'sinon';
import { CheckingObsceneWords } from '../../../CheckingObsceneWords/CheckingObscenceWords';
import { OBSCENE_WORD_INCLUDES_IN_SET } from './../../../../shared/mocks/ChekingObsceneWords';

describe('DisplayName Value Object', () => {
  describe('In case of sucess', () => {
    const displayName = new DisplayName(DISPLAY_NAME_VALID);
    it('Must be possible to return the display name', () => {
      expect(displayName.value).toEqual(DISPLAY_NAME_VALID);
    });
    it('Should be possible to change the display name, and If everything goes well, the new display name should be returned', () => {
      expect(displayName.value).toEqual(DISPLAY_NAME_VALID);
      displayName.value = OTHER_DISPLAY_NAME_VALID;
      expect(displayName.value).toEqual(OTHER_DISPLAY_NAME_VALID);
    });
    describe('In case of error', () => {
      it('If the name contains more than 26 characters, the maximum limit allowed by the application, an error is triggered in the application', () => {
        expect(() => new DisplayName(DISPLAY_NAME_INVALID)).toThrowError('Name must be max 26 characters. Enter a valid name');
      });
      it('If the name contains 3 characters, that is, the minimum limit allowed by the application, an error is triggered in the application', () => {
        expect(() => new DisplayName(DISPLAY_NAME_MINIMUM_INVALID_CHARACTERS)).toThrowError('Name must be min 3 characters. Enter a valid name');
      });
      it('If the name provided by the user for the display name contains an obscene word, an error is triggered in the application', () => {
        Sinon.stub(CheckingObsceneWords.prototype, 'execute').returns(true);
        expect(() => new DisplayName(OBSCENE_WORD_INCLUDES_IN_SET).value).toThrowError('Cannot create username with these words. Try others');
        Sinon.restore();
      });
      it('If the user tries to update the display name with the same name previously used in its creation, an error is triggered in the application', () => {
        const userDisplayName = new DisplayName(DISPLAY_NAME_VALID);
        expect(() => (userDisplayName.value = DISPLAY_NAME_VALID)).toThrowError('Display Name already registered! Please try other name');
      });
      it('If the user tries to update the display name by including an obscene word when creating the new name, an error is triggered in the application', () => {
        const userDisplayName = new DisplayName(DISPLAY_NAME_VALID);
        Sinon.stub(CheckingObsceneWords.prototype, 'execute').returns(true);
        expect(() => (userDisplayName.value = OBSCENE_WORD_INCLUDES_IN_SET)).toThrowError('Cannot create username with these words. Try others.');
      });
    });
  });
});
