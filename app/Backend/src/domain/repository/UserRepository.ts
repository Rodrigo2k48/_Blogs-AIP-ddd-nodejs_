/* eslint-disable no-unused-vars */
import { UserZod } from '../../application/validation/zod/schemas/zodTypes';

export interface UserRepository {
  registrerNewUser(userInfos: UserZod): Promise<string | void>;
}
