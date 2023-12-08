/* eslint-disable no-unused-vars */
import { UserInterface } from '../entities/User/User';

export interface TokenRepository<T> {
  createToken(userInfos: Omit<UserInterface, 'password'>): string
  verifyToken(token: string): T | string
}