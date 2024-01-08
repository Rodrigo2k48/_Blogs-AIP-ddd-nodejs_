import { USER_IN_DB } from '../../AuthRoute/mocks/authRoute.mock';
import * as jwt from 'jsonwebtoken';

export const CATEGORIES_DATABASE = [
  {
    id: 1,
    categoryName: 'Futebol',
  },
  {
    id: 2,
    categoryName: 'Music',
  },
];

export const CATEGORIE_INPUT = {
  id: 3,
  categoryName: 'Sport',
};

export const mockToken = () => {
  const payload = USER_IN_DB;
  const expiration = Math.floor(new Date('9999-12-31').getTime() / 1000);
  const token = jwt.sign(payload, 'secret', { expiresIn: expiration });
  return token;
};

export const TOKEN_VALID: string = mockToken();

export const ID_INVALID = '999999999999';
