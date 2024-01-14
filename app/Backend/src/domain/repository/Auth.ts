/* eslint-disable no-unused-vars */
export interface AuthRepository {
  userLogin(email: string, password: string): Promise<string>;
}
