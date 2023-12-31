import { GetAllUsers } from './../../application/useCases/GetAllUsers/GetAllUsers';
import { CreateUser } from '../../application/useCases/CreateUser/CreateUser';
import { UserZod } from '../../application/validation/zod/schemas/zodTypes';
import { TokenManager } from '../../domain/entities/Token/TokenManager';
import { User, UserInterface } from '../../domain/entities/User/User';
import Conflict from '../../domain/error/typeErros/Conflict';
import { UserRepository } from '../../domain/repository/UserRepository';

export class UserService implements UserRepository {
  protected createUser: CreateUser;
  protected TokenManager: TokenManager;
  protected getUsers: GetAllUsers;

  constructor(createUser: CreateUser, TokenManager: TokenManager, getAllUsers: GetAllUsers) {
    this.getUsers = getAllUsers;
    this.createUser = createUser;
    this.TokenManager = TokenManager;
  }
  async getAllUsers(): Promise<Omit<UserInterface, 'password'>[]> {
    const users = await this.getUsers.execute();
    return users;
  }

  async registrerNewUser(userInfos: UserZod): Promise<string | void> {
    const { email, password, user_name, image } = userInfos;
    const user = new User(email, password, user_name, image);
    const newUser = await this.createUser.execute({
      email: user.email,
      password: user.passMethods().valueInHash(),
      user_name: user.userName,
      image: user.image,
    });
    if (newUser) {
      const tokenInfos = {
        email: user.email,
        user_name: user.userName,
        image: user.image,
      };
      const token = this.TokenManager.createToken(tokenInfos);
      return token;
    } else {
      throw new Conflict('Conflict');
    }
  }
}
