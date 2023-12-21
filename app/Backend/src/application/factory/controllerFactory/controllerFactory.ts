import { TokenManager } from '../../../domain/entities/Token/TokenManager';
import { AuthController } from '../../../infrastructure/controllers/AuthController';
import { AuthService } from '../../../infrastructure/services/AuthService';
import { FindUserByEmail } from '../../useCases/FindUserByEmail/FindUserByEmail';

const findUserByEmail = new FindUserByEmail();
const tokenManager = new TokenManager();

const authService = new AuthService(findUserByEmail, tokenManager);
export const authController = new AuthController(authService);