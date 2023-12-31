import { TokenManager } from '../../../domain/entities/Token/TokenManager';
import { AuthController } from '../../../infrastructure/controllers/AuthController';
import { UserController } from '../../../infrastructure/controllers/UserController';
import { AuthService } from '../../../infrastructure/services/AuthService';
import { UserService } from '../../../infrastructure/services/UserService';
import { CreateUser } from '../../useCases/CreateUser/CreateUser';
import { FindUserByEmail } from '../../useCases/FindUserByEmail/FindUserByEmail';
import { GetAllUsers } from '../../useCases/GetAllUsers/GetAllUsers';

const findUserByEmail = new FindUserByEmail();
const getAllUsers = new GetAllUsers();
const createUser = new CreateUser();
const tokenManager = new TokenManager();

const authService = new AuthService(findUserByEmail, tokenManager);
export const authController = new AuthController(authService);

const userService = new UserService(createUser, tokenManager, getAllUsers);
export const userController = new UserController(userService);
