import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const DATABASE_MOCK = [
  {
    id: 1,
    email: 'Bruce@bruce.com',
    user_name: 'Bruce W.',
    image: 'imagebat.png',
  },
  {
    id: 2,
    email: 'Dick@grayson.com',
    user_name: 'Robin',
    image: 'imagerobin.png',
  },
  {
    id: 3,
    email: 'Barbara@gordon.com',
    user_name: 'Oracle',
    image: 'imagebarbara.png',
  },
];

export const USER_IN_DB = {
  id: 1,
  user_name: 'Admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  // password: secret_admin
  image: 'https://a.espncdn.com/photo/2023/0723/r1201394_1296x729_16-9.jpg',
};

export const USER_EMAIL = USER_IN_DB.email;
export const USER_PASSWORD = 'secret_admin';
export const USER_NAME = USER_IN_DB.user_name;
export const USER_IMAGE = USER_IN_DB.image;

// This function always creates a valid token to serve as a mock in tests
export const mockToken = () => {
  const payload = USER_IN_DB;
  const expiration = Math.floor(new Date('9999-12-31').getTime() / 1000);
  const token = jwt.sign(payload, 'secret', { expiresIn: expiration });
  return token;
};

export const TOKEN_VALID: string = mockToken();
