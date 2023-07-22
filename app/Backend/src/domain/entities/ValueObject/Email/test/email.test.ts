import {it, describe, expect} from 'vitest';
import {Email} from '../Email';
import {EMAIL_INVALID, EMAIL_VALID} from './mocks/email.mock';

describe('Email Value Object', () => {
  describe('in case of success', () => {
    it('must return the email if it is in valid format', () => {
      const email = new Email(EMAIL_VALID);
      expect(email.value).toEqual(EMAIL_VALID);
    });
    describe('in case of error', () => {
      it('must throw an error if email is in invalid format', () => {
        expect(() => new Email(EMAIL_INVALID)).toThrowError('"email" must be a valid email');
      });
    });
  });
});