import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { TokenRepository } from '../../repository/TokenRepository';
import { UserInterface } from '../User/User';
import UnauthorizedError from '../../error/typeErros/Unauthorized';

dotenv.config();

export class TokenManager implements TokenRepository<jwt.JwtPayload> {
  private _config: jwt.SignOptions = {
    expiresIn: '500d',
    algorithm: 'HS256',
  };
  private _secret = process.env.JWT_SECRET || 'secret';

  createToken(userInfos: Omit<UserInterface, 'password'>): string {
    const token = jwt.sign(userInfos, this._secret, this._config);
    return token;
  }
  verifyToken(token: string): string | jwt.JwtPayload {
    try {
      const isValidToken = jwt.verify(token, this._secret, this._config);
      return isValidToken;
    } catch (_err) {
      throw new UnauthorizedError('Expired or invalid token');
    }
  }
}


