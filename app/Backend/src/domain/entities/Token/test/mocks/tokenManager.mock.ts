import { UserInterface } from '../../../User/User';

export const USER_VALID_IN_DB: Omit<UserInterface, 'password'> =   {
  id: 1,
  userName: 'User',
  email: 'user@user.com',
  image: 'image',
  // senha: secret_user
};

export const TOKEN_INVALID = 'Token invalid';
