import { Email } from '../ValueObject/Email/Email';
import { Password } from '../ValueObject/Password/Password';
import { DisplayName } from '../ValueObject/DisplayName/DisplayName';

export interface UserInterface {
  id?: number;
  email: string;
  password: string;
  userName?: string;
  image?: string;
}

export class User implements UserInterface {
  private _id?: number;
  private _email: Email;
  private _password: Password;
  private _userName?: DisplayName;
  private _image?: string;

  constructor(email: string, password: string, userName: string, image?: string, id?: number) {
    this._id = id;
    this._email = new Email(email);
    this._userName = new DisplayName(userName);
    this._password = new Password(password);
    this._image = image;
  }
  get id(): number | undefined {
    return this._id;
  }
  get email(): string {
    return this._email.value;
  }
  set email(value: string) {
    this._email.value = value;
  }
  passMethods(): Password {
    return this._password;
  }
  get password(): string {
    return this._password.valueInHash();
  }
  set password(value: string) {
    this._password.value = value;
  }
  get userName(): string | undefined {
    return this._userName?.value;
  }
  get image(): string | undefined {
    return this._image;
  }
  get secureUserInfos() {
    return {
      id: this._id,
      email: this._email.value,
      userName: this._userName?.value,
      image: this._image,
    };
  }
}
