import { TokenManager } from '../../../domain/entities/Token/TokenManager';
import { AuthController } from '../../../infrastructure/controllers/AuthController';
import { CategoryController } from '../../../infrastructure/controllers/CategoryController';
import { UserController } from '../../../infrastructure/controllers/UserController';
import { AuthService } from '../../../infrastructure/services/AuthService';
import { CategoryService } from '../../../infrastructure/services/CategoryService';
import { UserService } from '../../../infrastructure/services/UserService';
import { CreateCategory } from '../../useCases/CategoriesCases/CreateCategory/CreateCategory';
import { GetAllCategories } from '../../useCases/CategoriesCases/GetAllCategories/GetAllCategories';
import { CreateUser } from '../../useCases/UserCases/CreateUser/CreateUser';
import { FindUserByEmail } from '../../useCases/UserCases/FindUserByEmail/FindUserByEmail';
import { GetAllUsers } from '../../useCases/UserCases/GetAllUsers/GetAllUsers';
import { GetUserById } from '../../useCases/UserCases/GetUserById/GetUserById';

const findUserByEmail = new FindUserByEmail();
const getAllUsers = new GetAllUsers();
const createUser = new CreateUser();
const tokenManager = new TokenManager();
const getUserById = new GetUserById();

const authService = new AuthService(findUserByEmail, tokenManager);
export const authController = new AuthController(authService);

const userService = new UserService(createUser, tokenManager, getAllUsers, getUserById);
export const userController = new UserController(userService);

const createCategory = new CreateCategory();
const getAllCategories = new GetAllCategories();

const categoryService = new CategoryService(createCategory, getAllCategories);
export const categoryController = new CategoryController(categoryService);
