import { describe, it, expect, beforeAll, vi, afterEach } from 'vitest';
import { PASSWORD_INVALID, PASSWORD_INVALID_HASH, USER_PASSWORD, PASSWORD_HASH } from './../../../../shared/mocks/User';
import { Password } from '../Password';

describe('Password Value Object', () => {
  describe('In case of sucess', () => {
    const pass = new Password(USER_PASSWORD);
    it('Must return the unhashed password', () => {
      expect(pass.value).toEqual(USER_PASSWORD);
    });
  });
  describe('In case password hash sucessfull', () => {
    let password: Password;
    beforeAll(() => {
      password = new Password(USER_PASSWORD);
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });
    it('Must return the hash of the password', () => {
      const mock = vi
        .fn()
        .mockImplementation(password.valueInHash)
        .mockImplementationOnce(() => PASSWORD_HASH);
      expect(mock()).toEqual(PASSWORD_HASH);
    });
    it('Should return true if the user password matches the hashed password stored in the database', () => {
      expect(password.compare(PASSWORD_HASH)).toBeTruthy();
    });
    it('Should return false if the user password does not match the hashed password stored in the database', () => {
      expect(password.compare(PASSWORD_INVALID_HASH)).toBeFalsy();
    });
  });
  describe('In case of error', () => {
    it('Must throw an error if the passed password has less than 6 characters', () => {
      expect(() => new Password(PASSWORD_INVALID)).toThrowError('"password" length must be at least 6 characters long');
    });
    it('Should throw an error if the new password passed to replace the previous one has less than 6 characters long', () => {
      expect(() => (new Password(USER_PASSWORD).value = PASSWORD_INVALID)).toThrowError('"password" length must be at least 6 characters long');
    });
  });
});
