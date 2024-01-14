import { it, describe, expect, beforeEach } from 'vitest';
import { TokenManager } from '../TokenManager';
import { TOKEN_INVALID } from './../../../shared/mocks/Utils';
import { USER_INFOS_TOKEN } from '../../../shared/mocks/User';

describe('Token Manager Domain', () => {
  let tokenManager: TokenManager;
  beforeEach(() => {
    tokenManager = new TokenManager();
  });
  describe('In case of success', () => {
    it('Should be possible to create a TokenManager instance', () => {
      expect(tokenManager).toBeInstanceOf(TokenManager);
    });
    it('Should be possible to create a valid token', () => {
      const token = tokenManager.createToken(USER_INFOS_TOKEN);
      const userInfos = tokenManager.verifyToken(token);
      const propertyUserInfos = Object.keys(userInfos);
      propertyUserInfos.forEach((info) => {
        expect(userInfos).toHaveProperty(info);
      });
      expect(token).toBeTypeOf('string');
    });
  });
  describe('In case of invalid token (error case)', () => {
    it('If the token is invalid, an error must be triggered in the application', () => {
      expect(() => tokenManager.verifyToken(TOKEN_INVALID)).toThrow('Expired or invalid token');
    });
  });
});
