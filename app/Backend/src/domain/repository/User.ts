/* eslint-disable no-unused-vars */
import { UserInterface } from '../entities/User/User';

export interface UserRepository {
  newUser(userInfos: UserInterface): Promise<string | void>;
  allUsers(): Promise<Omit<UserInterface, 'password'>[]>;
  searchUserById(id: number): Promise<Omit<UserInterface, 'password'>>;
}
