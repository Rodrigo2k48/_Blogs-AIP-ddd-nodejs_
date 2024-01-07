/* eslint-disable no-unused-vars */
import { UserInterface } from '../entities/User/User';

export interface UserRepository {
  registrer(userInfos: UserInterface): Promise<string | void>;
  getAll(): Promise<Omit<UserInterface, 'password'>[]>;
  getById(id: number): Promise<Omit<UserInterface, 'password'>>;
}
