import { NextFunction, Request, Response, Router } from 'express';
import { authController } from '../../application/factory/controllerFactory/controllerFactory';

const authRouter = Router();


authRouter.post('/', (req: Request, res: Response, next: NextFunction) => authController.login(req, res, next));


export default authRouter;
