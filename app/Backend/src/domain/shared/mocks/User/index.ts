export const USER_DATABASE = [
  {
    id: 1,
    email: 'Bruce@bruce.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    user_name: 'Bruce W.',
    image: 'imagebat.png',
  },
  {
    id: 2,
    email: 'Dick@grayson.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    user_name: 'Robin',
    image: 'imagerobin.png',
  },
  {
    id: 3,
    email: 'Barbara@gordon.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    user_name: 'Oracle',
    image: 'imagebarbara.png',
  },
];

export const NEW_USER = {
  id: 4,
  userName: 'Joker',
  email: 'JokerHahaha@joker.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  image: 'https://a.espncdn.com/photo/2023/0723/r1201394_1296x729_16-9.jpg',
};

export const USER_INFOS_TOKEN = {
  id: NEW_USER.id,
  email: NEW_USER.email,
  userName: NEW_USER.userName,
  image: NEW_USER.email,
};

export const USER_OUTPUT = {
  id: USER_DATABASE[0].id,
  email: USER_DATABASE[0].email,
  password: USER_DATABASE[0].password,
  userName: USER_DATABASE[0].user_name,
  image: USER_DATABASE[0].email,
};
export const USER_ID_VALID = USER_DATABASE[0].id;
export const USER_ID_INVALID = 9;
export const USER_EMAIL = USER_DATABASE[0].email;
export const USER_PASSWORD = 'secret_admin';
export const USER_NAME = USER_DATABASE[0].user_name;
export const USER_IMAGE = USER_DATABASE[0].image;

export const USER_CLASS_PROPERTIES = ['email', 'password', 'userName', 'id', 'image'];
export const OTHER_EMAIL = 'batfamily@email.com';
export const OTHER_PASSWORD = 'batman-pass';
export const OTHER_PASSWORD_HASH = '$2b$10$VbfxzpQdzb/DEa0dE6J7yer97c8b56FbngjmMySX9QkymEeOz9MvK';
export const PASSWORD_HASH = USER_DATABASE[0].password;
export const PASSWORD_INVALID = '12345';
export const PASSWORD_INVALID_HASH = '$2b$10$lqzoIQbvKeqIY7dIUx4w0.bAYteHpu7PNw9E7wsi/RbrX0uASX8C';
export const EMAIL_INVALID = 'jokertheking.com';
export const PASSWORD_NOT_REGISTERED = 'pinguin';
export const EMAIL_NOT_REGISTERED = 'pinguin@pinguin.com';
