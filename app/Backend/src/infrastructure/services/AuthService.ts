/* eslint-disable no-unused-vars */
import { FindUserByEmail } from '../../application/useCases/UserCases/FindUserByEmail/FindUserByEmail';
import { TokenManager } from '../../domain/entities/Token/TokenManager';
import { User, UserInterface } from '../../domain/entities/User/User';
import BadRequest from '../../domain/error/typeErros/BadRequest';
import { AuthRepository } from '../../domain/repository/Auth';

export class AuthService implements AuthRepository {
  protected findByEmail: FindUserByEmail;
  protected TokenManager: TokenManager;

  constructor(findByEmail: FindUserByEmail, tokenManager: TokenManager) {
    this.findByEmail = findByEmail;
    this.TokenManager = tokenManager;
  }
  async userLogin(userEmail: string, userPassword: string): Promise<string> {
    const hasUser = (await this.findByEmail.execute(userEmail)) as UserInterface;
    if (!hasUser) {
      throw new BadRequest('invalid field.');
    }
    const user = new User(hasUser.email, userPassword, hasUser.userName, hasUser.image, Number(hasUser.id));
    if (!user.passMethods().compare(hasUser.password)) {
      throw new BadRequest('invalid field.');
    }
    const token = this.TokenManager.createToken(user.secureUserInfos);
    return token;
  }
}
