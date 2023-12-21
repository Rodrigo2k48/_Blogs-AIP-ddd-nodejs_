import { it, describe, expect, beforeEach, vi } from 'vitest';
import { User } from '../User';
import { EMAIL, PASSWORD, USERNAME, CLASS_PROPERTIES, OTHER_EMAIL, OTHER_PASSWORD, OTHER_PASSWORD_HASH, PASSWORD_HASH } from './mocks/user.mock';
import { Password } from '../../ValueObject/Password/Password';

describe('User Domain', () => {
  describe('in case of success', () => {
    let user: User;
    beforeEach(() => {
      user = new User(EMAIL, PASSWORD, USERNAME);
    });
    it('should be possible to create a User instance', () => {
      expect(user).toBeInstanceOf(User);
    });
    it('should be possible to modify the user email', () => {
      expect(user.email).toEqual(EMAIL);
      user.email = OTHER_EMAIL;
      expect(user.email).toEqual(OTHER_EMAIL);
    });
    it('should be possible to access the password methods of the instantiated user class itself', () => {
      expect(user.passMethods()).toBeInstanceOf(Password);
    });
    it('should be possible to modify the user password', () => {
      const mock = vi
        .fn()
        .mockImplementation(() => user.password)
        .mockImplementationOnce(() => PASSWORD_HASH)
        .mockImplementationOnce(() => OTHER_PASSWORD_HASH);

      expect(mock()).toEqual(PASSWORD_HASH);
      user.password = OTHER_PASSWORD;
      expect(mock()).toEqual(OTHER_PASSWORD_HASH);
      expect(mock()).not.toEqual(PASSWORD_HASH);
    });
    it('there must be all the correct properties in the User class', () => {
      CLASS_PROPERTIES.forEach((pro) => {
        expect(user).toHaveProperty(pro);
      });
    });
    it('must be possible to return all information about the user that does not compromise confidential information such as password or other data', () => {
      expect(user.secureUserInfos).toEqual({ email: user.email, userName: user.userName, image: user.image, id: user.id });
    });
  });
});
