import { NextFunction, Request, Response } from 'express';
import { AuthRepository } from '../../domain/repository/AuthRepository';
import { loginSchema } from '../../application/validation/zod/schemas/zodValidation';
import BadRequest from '../../domain/error/typeErros/BadRequest';

export class AuthController {
  protected authService: AuthRepository;
  constructor(authService: AuthRepository) {
    this.authService = authService;
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { success } = loginSchema.safeParse(req.body);
      if (success) {
        const { email, password } = req.body;
        const token = await this.authService.login(email, password);
        return res.status(200).json({ token });
      } else {
        throw new BadRequest('Some required fields are missing');
      }
    } catch (error) {
      next(error);
    }
  }
}
