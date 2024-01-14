import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../../domain/repository/User';
import { userInputSchema } from '../../application/validation/zod/schemas/zodValidation';
import HTTP_STATUS from '../../domain/error/httpStatusCode';

export class UserController {
  protected userService: UserRepository;
  constructor(userService: UserRepository) {
    this.userService = userService;
  }

  async registrerNewUser(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { email, password, image, userName } = userInputSchema.parse(req.body);
      const token = await this.userService.newUser({ email, password, image, userName });
      return res.status(HTTP_STATUS.SuccessCreated).json({ token });
    } catch (err) {
      next(err);
    }
  }
  async getAllUsers(_req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const users = await this.userService.allUsers();
      return res.status(HTTP_STATUS.SuccessOK).json({ users });
    } catch (err) {
      next(err);
    }
  }
  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { id } = req.params;
      const user = await this.userService.searchUserById(Number(id));
      return res.status(HTTP_STATUS.SuccessOK).json(user);
    } catch (err) {
      next(err);
    }
  }
}
