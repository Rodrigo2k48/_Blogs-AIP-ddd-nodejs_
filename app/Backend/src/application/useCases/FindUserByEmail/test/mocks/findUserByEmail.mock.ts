// import { UserInterface } from '../../../../../domain/entities/User/User';

import { User } from '../../../../../domain/entities/User/User';

export const PASSWORD_HASH_MOCK = '$2b$10$GaRMVcWIk9bTUmB8MBj87uF4Yo3L9INcWCqatCTXgsHJNdTntnmlq'; 
export const USER_MOCK = new User('bruce@wane.com', 'i am revenge', 'Bruce', undefined, 1);

export const USER_IN_DATABASE_VALID = {
  id: USER_MOCK.id,
  email: USER_MOCK.email,
  password: PASSWORD_HASH_MOCK,
  user_name: USER_MOCK.userName,
  image: USER_MOCK.image
};

export const EMAIL_VALID = USER_IN_DATABASE_VALID.email;
export const EMAIL_INVALID = 'jokertheking.com';
