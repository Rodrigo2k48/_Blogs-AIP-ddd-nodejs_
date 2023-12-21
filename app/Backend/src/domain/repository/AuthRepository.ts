/* eslint-disable no-unused-vars */
export interface AuthRepository {
  login(email: string, password: string): Promise<string>;
}