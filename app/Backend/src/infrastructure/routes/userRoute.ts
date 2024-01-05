import { Router, Request, Response, NextFunction } from 'express';
import { userController } from '../../application/factory/controllerFactory/controllerFactory';
import { AuthValidate } from '../middleware/AuthValidate';

const userRoute = Router();

userRoute.post('/', (req: Request, res: Response, next: NextFunction) => userController.registrer(req, res, next));
userRoute.get('/', AuthValidate.TokenValidate, (req: Request, res: Response, next: NextFunction) => userController.getAllUsers(req, res, next));
userRoute.get('/:id', AuthValidate.TokenValidate, (req: Request, res: Response, next: NextFunction) => userController.getUserById(req, res, next));

export default userRoute;
