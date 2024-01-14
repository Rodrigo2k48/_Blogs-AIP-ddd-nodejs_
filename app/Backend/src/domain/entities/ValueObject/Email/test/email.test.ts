import { it, describe, expect } from 'vitest';
import { Email } from '../Email';
import { EMAIL_INVALID, USER_EMAIL, OTHER_EMAIL } from './../../../../shared/mocks/User';

describe('Email Value Object', () => {
  describe('In case of success', () => {
    const email = new Email(USER_EMAIL);
    it('Must return the email if it is in valid format', () => {
      expect(email.value).toEqual(USER_EMAIL);
    });
    it('It should be possible to modify the user email', () => {
      expect(email.value).toEqual(USER_EMAIL);
      email.value = OTHER_EMAIL;
      expect(email.value).toEqual(OTHER_EMAIL);
    });
    describe('In case of error', () => {
      it('Must throw an error if email is in invalid format', () => {
        expect(() => new Email(EMAIL_INVALID)).toThrowError('"email" must be a valid email');
      });
      it('Should throw an error if the new email passed to replace the previous one is in invalid format', () => {
        const email = new Email(USER_EMAIL);
        expect(email.value).toEqual(USER_EMAIL);
        expect(() => (email.value = EMAIL_INVALID)).toThrowError('"email" must be a valid email');
      });
      it('Should throw an error if the new email passed to replace the previous one is exactly the same as the already established email', () => {
        const email = new Email(USER_EMAIL);
        expect(email.value).toEqual(USER_EMAIL);
        expect(() => (email.value = USER_EMAIL)).toThrowError('Email already registered');
      });
    });
  });
});
