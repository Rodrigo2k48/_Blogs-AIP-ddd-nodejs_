import { GetAllUsers } from './../../application/useCases/UserCases/GetAllUsers/GetAllUsers';
import { CreateUser } from '../../application/useCases/UserCases/CreateUser/CreateUser';
import { TokenManager } from '../../domain/entities/Token/TokenManager';
import { User, UserInterface } from '../../domain/entities/User/User';
import Conflict from '../../domain/error/typeErros/Conflict';
import { UserRepository } from '../../domain/repository/User';
import { GetUserById } from '../../application/useCases/UserCases/GetUserById/GetUserById';
import NotFoundError from '../../domain/error/typeErros/NotFound';

export class UserService implements UserRepository {
  protected create: CreateUser;
  protected TokenManager: TokenManager;
  protected getAll: GetAllUsers;
  protected getById: GetUserById;

  constructor(create: CreateUser, TokenManager: TokenManager, getAll: GetAllUsers, getById: GetUserById) {
    this.getById = getById;
    this.getAll = getAll;
    this.create = create;
    this.TokenManager = TokenManager;
  }

  async newUser(userInfos: UserInterface): Promise<string | void> {
    const { email, password, userName, image } = userInfos;
    const user = new User(email, password, userName, image);
    const newUser = await this.create.execute({
      email: user.email,
      password: user.passMethods().valueInHash(),
      userName,
      image: user.image,
    });
    if (newUser) {
      const tokenInfos = {
        email: user.email,
        userName: user.userName,
        image: user.image,
      };
      const token = this.TokenManager.createToken(tokenInfos);
      return token;
    } else {
      throw new Conflict('Conflict');
    }
  }
  async searchUserById(id: number): Promise<Omit<UserInterface, 'password'>> {
    const hasUser = (await this.getById.execute(id)) as UserInterface;
    if (!hasUser) {
      throw new NotFoundError('User does not exist');
    }
    return hasUser;
  }
  async allUsers(): Promise<Omit<UserInterface, 'password'>[]> {
    const users = await this.getAll.execute();
    return users;
  }
}
