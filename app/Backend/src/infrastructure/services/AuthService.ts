/* eslint-disable no-unused-vars */
import { FindUserByEmail } from '../../application/useCases/FindUserByEmail/FindUserByEmail';
import { TokenManager } from '../../domain/entities/Token/TokenManager';
import { User } from '../../domain/entities/User/User';
import BadRequest from '../../domain/error/typeErros/BadRequest';
import { AuthRepository } from '../../domain/repository/AuthRepository';

export class AuthService implements AuthRepository {
  protected findUserByEmail: FindUserByEmail;
  protected TokenManager: TokenManager;

  constructor(findUserByEmail: FindUserByEmail, tokenManager: TokenManager) {
    this.findUserByEmail = findUserByEmail;
    this.TokenManager = tokenManager;
  }
  async login(userEmail: string, userPassword: string): Promise<string> {
    const hasUser = await this.findUserByEmail.execute(userEmail);
    if (!hasUser) {
      throw new BadRequest('invalid field');
    }
    const user = new User(hasUser.email, userPassword, hasUser.userName, hasUser.image, Number(hasUser.id));
    if (!user.passMethods().compare(hasUser.password)) {
      throw new BadRequest('invalid field');
    }
    const token = this.TokenManager.createToken(user.secureUserInfos);
    return token;
  }
}
