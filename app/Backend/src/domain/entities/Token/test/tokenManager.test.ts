import { it, describe, expect, beforeEach } from 'vitest';
import { TokenManager } from '../TokenManager';
import { TOKEN_INVALID, USER_VALID_IN_DB } from './mocks/tokenManager.mock';

describe('Token Manager Domain', () => {
  let tokenManager: TokenManager;
  beforeEach(() => {
    tokenManager = new TokenManager();
  });
  describe('in case of success', () => {
    it('should be possible to create a TokenManager instance', () => {
      expect(tokenManager).toBeInstanceOf(TokenManager);
    });
    it('should be possible to create a valid token', () => {
      const token = tokenManager.createToken(USER_VALID_IN_DB);
      expect(token).toBeTypeOf('string');
      expect(tokenManager.verifyToken(token)).toBeTypeOf('object');
      expect(tokenManager.verifyToken(token)).toHaveProperty('email');
      expect(tokenManager.verifyToken(token)).toHaveProperty('userName');
      expect(tokenManager.verifyToken(token)).toHaveProperty('image');
      expect(tokenManager.verifyToken(token)).toHaveProperty('id');
    });
  });
  describe('in case of invalid token (error case)', () => {
    it('If the token is invalid, an error must be triggered in the application', () => {
      expect(() => tokenManager.verifyToken(TOKEN_INVALID)).toThrow('Expired or invalid token');
    });
    
  });
});
