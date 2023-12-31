/* eslint-disable no-unused-vars */
import { UserZod } from '../../application/validation/zod/schemas/zodTypes';
import { UserInterface } from '../entities/User/User';

export interface UserRepository {
  registrerNewUser(userInfos: UserZod): Promise<string | void>;
  getAllUsers(): Promise<Omit<UserInterface, 'password'>[]>;
}
