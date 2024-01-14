import { NextFunction, Request, Response } from 'express';
import { CategoryRepository } from '../../domain/repository/Category';
import { categoryInputSchema } from '../../application/validation/zod/schemas/zodValidation';
import HTTP_STATUS from '../../domain/error/httpStatusCode';

export class CategoryController {
  protected categoryService: CategoryRepository;

  constructor(categoryService: CategoryRepository) {
    this.categoryService = categoryService;
  }

  async createCategory(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name } = categoryInputSchema.parse(req.body);
      const newCategory = await this.categoryService.newCategory(name);
      return res.status(HTTP_STATUS.SuccessCreated).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
  async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const allCategories = await this.categoryService.allCategories();
      return res.status(HTTP_STATUS.SuccessOK).json(allCategories);
    } catch (error) {
      next(error);
    }
  }
}
