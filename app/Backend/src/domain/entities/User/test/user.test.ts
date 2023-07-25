import { it, describe, expect, beforeEach } from 'vitest';
import { User } from '../User';
import { EMAIL, PASSWORD, USERNAME, CLASS_PROPERTIES} from './mocks/user.mock';

describe('User Domain', () => {
  describe('in case of success', () => {
    let user: User;
    beforeEach(() => {
      user = new User(EMAIL, PASSWORD, USERNAME);
    });
    it('should be possible to create a User instance', () => {
      expect(user).toBeInstanceOf(User);
    });
    it('there must be all the correct properties in the User class', () => {
      CLASS_PROPERTIES.forEach((pro) => {
        expect(user).toHaveProperty(pro); 
      });
    });
  });
});
