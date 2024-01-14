import { NEW_USER } from '../../mocks/User/index';
import * as jwt from 'jsonwebtoken';

// This function always creates a valid token to serve as a mock in tests
export const mockToken = () => {
  const payload = NEW_USER;
  const expiration = Math.floor(new Date('9999-12-31').getTime() / 1000);
  const token = jwt.sign(payload, 'secret', { expiresIn: expiration });
  return token;
};

export const TOKEN_VALID: string = mockToken();

export const TOKEN_INVALID = 'Token invalid';

export const ID_INVALID = '999999999999';
