import { NextFunction, Request, Response } from 'express';
import { TokenManager } from '../../domain/entities/Token/TokenManager';
import UnauthorizedError from '../../domain/error/typeErros/Unauthorized';

export class AuthValidate {
  public static async TokenValidate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnauthorizedError('Token Not found');
    }
    try {
      const userInfos = new TokenManager().verifyToken(authorization);
      //In case in the future i need user information
      req.body.userInfos = userInfos;
      next();
    } catch (_error) {
      throw new UnauthorizedError('Token must be a valid token');
    }
  }
}
