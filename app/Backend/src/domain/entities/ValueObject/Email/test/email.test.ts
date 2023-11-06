import { it, describe, expect } from 'vitest';
import { Email } from '../Email';
import { EMAIL_INVALID, EMAIL_VALID, OTHER_EMAIL_VALID } from './mocks/email.mock';

describe('Email Value Object', () => {
  describe('in case of success', () => {
    it('must return the email if it is in valid format', () => {
      const email = new Email(EMAIL_VALID);
      expect(email.value).toEqual(EMAIL_VALID);
    });
    it('It should be possible to modify the user\'s email', () => {
      const email = new Email(EMAIL_VALID);
      expect(email.value).toEqual(EMAIL_VALID);
      email.value = OTHER_EMAIL_VALID;
      expect(email.value).toEqual(OTHER_EMAIL_VALID);
    });
    describe('in case of error', () => {
      it('must throw an error if email is in invalid format', () => {
        expect(() => new Email(EMAIL_INVALID)).toThrowError('"email" must be a valid email');
      });
      it('should throw an error if the new email passed to replace the previous one is in invalid format', () => {
        const email = new Email(EMAIL_VALID);
        expect(email.value).toEqual(EMAIL_VALID);
        expect(() => email.value = EMAIL_INVALID).toThrowError('"email" must be a valid email');
      });
      it('should throw an error if the new email passed to replace the previous one is exactly the same as the already established email', () => {
        const email = new Email(EMAIL_VALID);
        expect(email.value).toEqual(EMAIL_VALID);
        expect(() => email.value = EMAIL_VALID).toThrowError('Email already registered');
      });
    });
  });
});
