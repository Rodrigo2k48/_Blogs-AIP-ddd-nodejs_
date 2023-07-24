import { describe, it, expect, beforeAll, vi, afterEach } from 'vitest';
import { PASSWORD_INVALID, PASSWORD_INVALID_HASH, PASSWORD_VALID, PASSWORD_VALID_HASH } from './mocks/password.mock';
import { Password } from '../Password';

describe('Password Value Object', () => {
  describe('in case of sucess', () => {
    it('must return the unhashed password', () => {
      const pass = new Password(PASSWORD_VALID);
      expect(pass.value).toEqual(PASSWORD_VALID);
    });
  });
  describe('in case password hash sucessfull', () => {
    let password: Password;
    beforeAll(() => {
      password = new Password(PASSWORD_VALID);
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });
    it('must return the hash of the password', () => {
      const mock = vi
        .fn()
        .mockImplementation(password.valueInHash)
        .mockImplementationOnce(() => PASSWORD_VALID_HASH);
      expect(mock()).toEqual(PASSWORD_VALID_HASH);
    });
    it('should return true if the user password matches the hashed password stored in the database', () => {
      expect(password.compare(PASSWORD_VALID_HASH)).toBeTruthy();
    });
    it('should return false if the user password does not match the hashed password stored in the database', () => {
      expect(password.compare(PASSWORD_INVALID_HASH)).toBeFalsy();
    });
  });
  describe('in case of error', () => {
    it('Must throw an error if the passed password has less than 6 characters', () => {
      expect(() => new Password(PASSWORD_INVALID)).toThrowError('"password" length must be at least 6 characters long');
    });
  });
});
