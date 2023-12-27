import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../../domain/repository/UserRepository';
import { userSchema } from '../../application/validation/zod/schemas/zodValidation';
import BadRequestError from '../../domain/error/typeErros/BadRequest';

export class UserController {
  protected userService: UserRepository;
  constructor(userService: UserRepository) {
    this.userService = userService;
  }

  async registrer(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { success } = userSchema.safeParse(req.body);
      if (success) {
        const { email, password, image, user_name } = req.body;
        const payload = { email, password, image, user_name };
        const token = await this.userService.registrerNewUser(payload);
        return res.status(201).json({ token });
      } else {
        throw new BadRequestError('Some required fields are missing');
      }
    } catch (error) {
      next(error);
    }
  }
}
