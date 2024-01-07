import { NextFunction, Request, Response } from 'express';
import { AuthRepository } from '../../domain/repository/AuthRepository';
import { loginInputSchema } from '../../application/validation/zod/schemas/zodValidation';
import BadRequest from '../../domain/error/typeErros/BadRequest';
import HTTP_STATUS from '../../domain/error/httpStatusCode';

export class AuthController {
  protected authService: AuthRepository;
  constructor(authService: AuthRepository) {
    this.authService = authService;
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { success } = loginInputSchema.safeParse(req.body);
      if (success) {
        const { email, password } = req.body;
        const token = await this.authService.login(email, password);
        return res.status(HTTP_STATUS.SuccessCreated).json({ token });
      } else {
        throw new BadRequest('Some required fields are missing');
      }
    } catch (error) {
      next(error);
    }
  }
}
