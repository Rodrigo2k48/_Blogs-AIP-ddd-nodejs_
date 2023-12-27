import { Router, Request, Response, NextFunction } from 'express';
import { userController } from '../../application/factory/controllerFactory/controllerFactory';

const userRoute = Router();

userRoute.post('/', (req: Request, res: Response, next: NextFunction) => userController.registrer(req, res, next));

export default userRoute;
