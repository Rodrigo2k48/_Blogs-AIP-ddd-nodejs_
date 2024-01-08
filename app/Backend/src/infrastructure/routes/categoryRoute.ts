import { NextFunction, Request, Response, Router } from 'express';
import { AuthValidate } from '../middleware/AuthValidate';
import { categoryController } from '../../application/factory/controllerFactory/controllerFactory';

const categoryRoute = Router();

categoryRoute.post('/', AuthValidate.TokenValidate, (req: Request, res: Response, next: NextFunction) => categoryController.createCategory(req, res, next));
categoryRoute.get('/', AuthValidate.TokenValidate, (req: Request, res: Response, next: NextFunction) => categoryController.getAllCategories(req, res, next));

export default categoryRoute;
