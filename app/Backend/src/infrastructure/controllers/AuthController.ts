import { NextFunction, Request, Response } from 'express';
import { AuthRepository } from '../../domain/repository/Auth';
import { loginInputSchema } from '../../application/validation/zod/schemas/zodValidation';
import HTTP_STATUS from '../../domain/error/httpStatusCode';

export class AuthController {
  protected authService: AuthRepository;
  constructor(authService: AuthRepository) {
    this.authService = authService;
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { email, password } = loginInputSchema.parse(req.body);
      const token = await this.authService.userLogin(email, password);
      return res.status(HTTP_STATUS.SuccessCreated).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
