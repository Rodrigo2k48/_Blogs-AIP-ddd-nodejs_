import { Email } from '../ValueObject/Email/Email';

interface UserInterface {
  id? : number;
  email: string;
  password: string;
  userName: string;
  image?: string;

}

export class  User implements UserInterface {
  private _id?: number;
  private _email: Email;
  private _password: string;
  private _userName: string;
  private _image?: string;

  constructor(email: string, password: string, userName: string, image?: string) {
    this._email = new Email(email);
    this._userName = userName;
    this._password = password;
    this._image = image;
  }
  get id(): number | undefined {
    return this._id;
  }
  get email(): string {
    return this._email.value;
  }
  get password(): string {
    return this._password;
  }
  get userName(): string {
    return this._userName;
  }
  get image(): string | undefined {
    return this._image;
  }
}
